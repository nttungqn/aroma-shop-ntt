const express = require('express');
const router = express.Router();

const authController = require('./../controllers/authController')
const userController = require('./../controllers/userController')

router.route('/sign-up').get(authController.getSignUp).post(authController.postSignUp);
router.route('/login').get(authController.getLogin).post(authController.postLogin);
router.get('/logout', authController.logout);
router.route('/verify-account').get(authController.getVerifyAccount).post(authController.postVerifyAccount);
router.route('/send-password-reset').get(authController.getSendPasswordReset).post(authController.postSendPasswordReset);
router.route('/confirm-password-reset').get(authController.getConfirmPasswordReset).post(authController.postConfirmPasswordReset);

// Protect all routes after this middleware
router.use(authController.protect);

router.route('/account').get(userController.getAccount).post(userController.postAccount);
router.route('/change-password').get(userController.getChangePassword).post(userController.postChangePassword);

module.exports = router;