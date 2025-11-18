const express = require("express");
const route = express.Router();
const { Product, Category } = require("../models");

// GET all products
route.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan data produk" });
  }
});

// GET product by ID
route.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: "category" }],
    });

    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan produk" });
  }
});

// CREATE product
route.post("/", async (req, res) => {
  try {
    const { nama, price, stock, CategoryId } = req.body;

    // Cek apakah kategori ada
    const category = await Category.findByPk(CategoryId);
    if (!category) {
      return res.status(400).json({ message: "CategoryId tidak valid" });
    }

    const product = await Product.create({ nama, price, stock, CategoryId });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE product
route.put("/:id", async (req, res) => {
  try {
    const { nama, price, stock, CategoryId } = req.body;

    const [updated] = await Product.update({ nama, price, stock, CategoryId }, { where: { id: req.params.id } });

    if (!updated) return res.status(404).json({ message: "Produk tidak ditemukan" });

    const updatedProduct = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: "category" }],
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE product
route.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) return res.status(404).json({ message: "Produk tidak ditemukan" });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus produk" });
  }
});

module.exports = route;
