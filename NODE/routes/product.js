const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const multer = require("multer");

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

// Endpoint pour ajouter des images à un produit existant
router.post("/:id/upload-images", upload.array("images", 10), async (req, res) => {
    console.log(req.files);
    try {
        const productId = req.params.id;

        // Rechercher le produit par ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Ajouter les chemins des nouvelles images à la galerie
        const imagePaths = req.files.map(file => file.path);
        product.images = [...product.images, ...imagePaths];

        // Sauvegarder les modifications
        await product.save();

        res.status(200).json({
            message: "Images successfully uploaded and added to the product",
            product,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new product
router.post("/", upload.array("images", 5), async (req, res) => { 
    try {
        const { name, price, description, stock, deliver } = req.body;
        const images = req.files ? req.files.map(file => file.path) : [];

        const product = new Product({
            name,
            price,
            description,
            stock,
            deliver,
            images,
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Read all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read a single product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a product by ID
router.put("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
