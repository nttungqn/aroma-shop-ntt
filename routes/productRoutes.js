const express = require("express");
const productController = require("./../controllers/productController");
const route = express.Router();

route
	.route("/")
	.get(productController.getAllProducts)
	// .post(productController.add)
	// .patch(productController.update)
	// .delete(productController.delete);
route.get("/trending-products", productController.getTrendingProduct);
route.get("/top-selling-products", productController.getTopSellingProducts);
route.get("/top-products", productController.getTopProducts);
route.get("/:id", productController.getProductById);

module.exports = route;
