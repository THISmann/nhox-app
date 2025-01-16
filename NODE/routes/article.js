const express = require("express");
const router = express.Router();
const Article = require("../models/article");
const multer = require("multer");
const path = require("path");

// Configuration de multer pour gérer le téléchargement des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Le répertoire où les fichiers seront stockés
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Nom unique pour chaque fichier
    },
});

// Créer une instance de multer
const upload = multer({ storage });


// Route pour créer un article avec un fichier
router.post("/", upload.array("gallery", 5), async (req, res) => {
    try {
        // Si des fichiers sont envoyés, on construit les URLs des fichiers dans la galerie
        const { title, description, text, imgSrc, link } = req.body;
        const gallery = req.files ? req.files.map(file => file.path) : [];
        // Créez un article avec les données et les URLs des images téléchargées
        const article = new Article({
            title ,
            description ,
            text,
            imgSrc,
            link,
            gallery, // Ajoutez les URLs des images dans la galerie
        });

        // Sauvegardez l'article dans la base de données
        const savedArticle = await article.save();
        res.status(201).json(savedArticle);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Endpoint pour ajouter des images à la galerie d'un article existant
router.post("/:id/upload-gallery", upload.array("gallery", 10), async (req, res) => {
    try {
        // Récupérer l'article par ID
        const articleId = req.params.id;
        const article = await Article.findById(articleId);

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        // Ajouter les chemins des images téléchargées à la galerie
        const imagePaths = req.files.map(file => file.path);
        article.gallery = [...article.gallery, ...imagePaths];

        // Sauvegarder les modifications
        await article.save();

        res.status(200).json({
            message: "Images successfully uploaded and added to the article",
            article,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
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
