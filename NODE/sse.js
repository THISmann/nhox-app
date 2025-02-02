const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createClient } = require('redis');
const Redis = require('ioredis');
const http = require('http'); // Required for Socket.IO
const { Server } = require('socket.io'); // Import Socket.IO

// Initialize the Express app
const app = express();
const port = 3003;

// Create an HTTP server for Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (modify for production)
  },
});

// Allow cross-origin requests
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/articleDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Only image files are allowed'), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Redis clients with error handling
const redisPublisher = createClient({
  url: 'redis://localhost:6379',
});

const redisSubscriber = new Redis({
  host: '127.0.0.1',
  port: 6379,
});

// Connect Redis publisher
redisPublisher.connect().then(() => console.log('Redis Publisher connected !!')).catch((err) => {
  console.error('Redis Publisher connection error:', err.message);
});

// Connect Redis subscriber
redisSubscriber.on('connect', () => console.log('Redis Subscriber connected'));
redisSubscriber.on('error', (err) => {
  console.error('Redis Subscriber connection error:', err.message);
});

// MongoDB Article schema and model
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  text: { type: String, required: true },
  imgSrc: { type: String, required: true },
  link: { type: String, required: false },
  gallery: { type: String, required: false },
});

const Article = mongoose.model('Article', articleSchema);

// Redis channel name
const CHANNEL_NAME = 'article_updates';

// Listen for Redis events and broadcast via Socket.IO
redisSubscriber.subscribe(CHANNEL_NAME).catch((err) => {
  console.error('Failed to subscribe to Redis channel:', err.message);
});

redisSubscriber.on('message', (channel, message) => {
  if (channel === CHANNEL_NAME) {
    const eventData = JSON.parse(message);
    console.log('Real-time event:', eventData);

    // Broadcast the event to all connected Socket.IO clients
    io.emit('article_update', eventData);
  }
});

// SSE endpoint for real-time events
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  redisSubscriber.on('message', (channel, message) => {
    if (channel === CHANNEL_NAME) {
      res.write(`data: ${message}\n\n`);
    }
  });

  req.on('close', () => res.end());
});

// CRUD operations (same as before)
app.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch articles', message: err.message });
  }
});

app.post('/articles', upload.single('gallery'), async (req, res) => {
  try {
    const { title, description, text, imgSrc, link } = req.body;
    const gallery = req.file ? req.file.filename : null;

    if (!title || !description || !text || !imgSrc) {
      return res.status(400).json({ error: 'Missing required fields (title, description, text, imgSrc).' });
    }

    const newArticle = new Article({ title, description, text, imgSrc, link, gallery });
    await newArticle.save();

    const eventData = { action: 'create', article: newArticle };
    await redisPublisher.publish(CHANNEL_NAME, JSON.stringify(eventData));

    res.status(201).json({ message: 'Article created successfully', article: newArticle });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create article', message: err.message });
  }
});

app.put('/articles/:id', async (req, res) => {
  try {
    const { title, description, text, imgSrc, link } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { title, description, text, imgSrc, link },
      { new: true },
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const eventData = { action: 'update', article: updatedArticle };
    await redisPublisher.publish(CHANNEL_NAME, JSON.stringify(eventData));

    res.status(200).json({ message: 'Article updated successfully', article: updatedArticle });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update article', message: err.message });
  }
});

app.delete('/articles/:id', async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);

    if (!deletedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const eventData = { action: 'delete', articleId: req.params.id };
    await redisPublisher.publish(CHANNEL_NAME, JSON.stringify(eventData));

    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete article', message: err.message });
  }
});

// Socket.IO Event Handling
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
  
    // Handle custom events, e.g., real-time updates
    redisSubscriber.on("message", (channel, message) => {
      const data = JSON.parse(message);
      io.emit("article_update", data); // Broadcast update to clients
    });
  
    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
  
  // Start the server
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });