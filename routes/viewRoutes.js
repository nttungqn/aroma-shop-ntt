/** @format */
const express = require('express');
const viewController = require('./../controllers/viewController');
const passport = require('passport');

const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/products', viewController.getShopCategory);
router.get('/products/:id', viewController.getDetailProduct);
router.route('/login').get(viewController.getLoginView);
router.post(
    '/login',
    passport.authenticate('local-login', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    }
);
router.route('/register').get(viewController.getRegisterView);

module.exports = router;
