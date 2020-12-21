/** @format */
const express = require('express');
const viewController = require('./../controllers/viewController');
const passport = require('passport');

const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/products', viewController.getShopCategory);
router.get('/products/:id', viewController.getDetailProduct);

module.exports = router;
