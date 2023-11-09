const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');

router.get("/all-products", productController.getAllProducts)
router.post("/add-new-product", productController.addNewProduct)

module.exports = router;