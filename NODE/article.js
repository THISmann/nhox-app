// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');  // Import the CORS module

// Initialize the Express app
const app = express();
const port = 3003;

// Allow cross-origin requests
app.use(cors());  // Enable CORS for all routes

// Connect to MongoDB (ensure MongoDB is running locally or use a cloud database like MongoDB Atlas)
mongoose.connect('mongodb://localhost:27017/articleDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define the storage for file uploads (for photos)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');  // Set the directory to store uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));  // Use timestamp as filename
//   }
// });

// Initialize multer for file upload handling
//const upload = multer({ storage: storage });

// Define the Article schema for MongoDB using Mongoose
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  text: { type: String, required: true },
  imgSrc: { type: String, required: true },
  link: { type: String, required: true }
  //photos: [{ type: String }]  // Array to store the filenames of photos
});

// Create the Article model based on the schema
const Article = mongoose.model('Article', articleSchema);

// Endpoint to create a new article
app.post('/articles',  async (req, res) => {
  try {
    // Extract article data from the request body
    const { title, description, text , imgSrc , link } = req.body;

    // Collect photo filenames from the uploaded files
    //const photos = req.files.map(file => file.filename);
    console.log(req.body);
    // Create a new article document
    const newArticle = new Article({
      title,
      description,
      text,
      imgSrc,
      link
    });

    // Save the article to the database
    await newArticle.save();

    res.status(201).json({ message: 'Article created successfully', article: newArticle });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create article', message: err.message });
  }
});

// Endpoint to get all articles
app.get('/articles', async (req, res) => {
  try {
    // Fetch all articles from the database
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch articles', message: err.message });
  }
});

// Endpoint to get a single article by its ID
app.get('/articles/:id', async (req, res) => {
  try {
    // Fetch the article by its ID from the database
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch article', message: err.message });
  }
});

// Endpoint to update an article by its ID
//upload.array('photos', 5),
app.put('/articles/:id',  async (req, res) => {
  try {
    const { title, description, text , imgSrc , link } = req.body;
    //const photos = req.files.map(file => file.filename);

    // Update the article in the database
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { title, description, text, imgSrc , link },
      { new: true }  // Return the updated document
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json({ message: 'Article updated successfully', article: updatedArticle });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update article', message: err.message });
  }
});

// Endpoint to delete an article by its ID
app.delete('/articles/:id', async (req, res) => {
  try {
    // Find and delete the article by its ID
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);

    if (!deletedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete article', message: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
