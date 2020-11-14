const express = require('express');
const productController = require('./../controllers/productController');

const router = express.Router();

router.get('/', (req, res) => {
	var cart = req.session.cart;
	res.locals.cart = cart.getCart();
	// console.log(cart.getCart());
	res.render('cart', {
		bannerPage: 'Cart',
		banner: 'Cart',
	});
});

router.post('/', (req, res, next) => {
	var productId = req.body.id;
	console.log(productId);
	var quantity = isNaN(req.body.quantity) ? 1 : req.body.quantity;
	productController
		.getProductById(productId)
		.then((product) => {
			var cartItem = req.session.cart.add(product, productId, quantity);
			// console.log(cartItem);
			res.json(cartItem);
		})
		.catch((err) => next(err));
});

router.put('/', (req, res) => {
	var productId = req.body.id;
	var quantity = parseInt(req.body.quantity);
	var cartItem = req.session.cart.update(productId, quantity);
	res.json(cartItem);
});

router.delete('/', (req, res) => {
	var productId = req.body.id;
	req.session.cart.remove(productId);
	res.json({
		totalQuantity: req.session.cart.totalQuantity,
		totalPrice: req.session.cart.totalPrice,
	});
});

router.delete('/all', (req, res) => {
	req.session.cart.empty();
	res.sendStatus(204);
	res.end();
});

module.exports = router;
