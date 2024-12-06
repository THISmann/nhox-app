const express = require("express");
const router = express.Router();
const Article = require("../models/article");

// Create a new article
router.post("/", async (req, res) => {
    try {
        const article = new Article(req.body);
        const savedarticle = await article.save();
        res.status(201).json(savedarticle);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read all articles
router.get("/", async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read a single article by ID
router.get("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: "article not found" });
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a article by ID
router.put("/:id", async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!article) return res.status(404).json({ message: "article not found" });
        res.status(200).json(article);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a article by ID
router.delete("/:id", async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) return res.status(404).json({ message: "article not found" });
        res.status(200).json({ message: "article deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
