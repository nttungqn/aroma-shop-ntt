const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);

// router.get('/products', viewController.getShopCategory);

// router.get('/products/:slug', viewController.getDetailProduct);

// router.get('/confirmation', (req, res) => {
// 	res,
// 		res.render('confirmation', {
// 			banner: 'Order Confirmation',
// 			bannerPage: 'Order Confirmation',
// 		});
// });

module.exports = router;
