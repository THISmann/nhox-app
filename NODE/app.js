const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/product");
const articleRoutes = require("./routes/article");
const cors = require('cors');  // Import the CORS module

const app = express();
const PORT = 3005;

// Middleware
app.use(bodyParser.json());
// Allow cross-origin requests
app.use(cors());  // Enable CORS for all routes

// Connect to MongoDB
mongoose
    .connect("mongodb://localhost:27017/nhoxDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/articles", articleRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
