const productService = require('../services/productService');

const productController = {
	async getAllProducts (req, res) {
		try {
			const fetchProducts = await productService.getAllProducts()
			console.log(fetchProducts, "eeeee")
		} catch(error) {
			console.log(error)
		}
	},
	async addNewProduct(req, res) {
		console.log(req.body, "----------------")
		// const productData = req.body
		// const addProduct = await productService.addNewProduct()
	}
}

module.exports = productController;