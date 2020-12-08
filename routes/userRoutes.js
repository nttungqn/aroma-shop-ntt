/** @format */

const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();



router.get('/logout', (req, res, next) => {
	req.session.destroy((err) => {
		if (err) {
			return next(err);
		}
		return res.redirect('/products');
	});
});
module.exports = router;
