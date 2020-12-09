/** @format */

const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();



router.get('/logout', (req, res, next) => {
	if (req.session.cart) {
		req.session.cart = null;
	}
	req.logout();
	res.redirect("/")
});
module.exports = router;
