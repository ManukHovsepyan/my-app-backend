const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  src: String,
  isLike: Boolean,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;