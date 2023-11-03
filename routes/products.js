const express = require('express');
const router = express.Router();
const Product = require('../models/product');
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/products', async (req, res) => {
  try {
    const products = await Product.create({
			"name": "product1",
			"description": "productDescription",
			"price": 987,
		})
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;