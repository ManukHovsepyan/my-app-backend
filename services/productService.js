const Product = require('../models/Product');

const productService = {
	async getAllProducts() {
		const allProducts = await Product.find()
		return allProducts
	},
	async addNewProduct(productInfo) {

		const newProduct = new Product({
			productInfo
	});

	return await Product.save(newProduct);
	}
}

module.exports = productService;