const express = require('express');
const router = express.Router();

const authController = require('./../controllers/authController')
const userController = require('./../controllers/userController')

router.route('/login').get(authController.getLogin).post(authController.postLogin);

router.get('/logout', authController.logout);

router.route('/account').get(userController.getAccount).post(userController.postAccount);

module.exports = router;