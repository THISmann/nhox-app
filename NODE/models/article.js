const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    text: { type: String, required: true },
    imgSrc: { type: String, required: true },
    link: { type: String, required: false },
    gallery: { type: [String], required: true } // Define gallery as an array of strings
  });

module.exports = mongoose.model("Article", articleSchema);