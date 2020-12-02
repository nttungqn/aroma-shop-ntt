/** @format */

const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

router.get('/login', (req, res) => {
	req.session.returnURL = req.query.returnURL;
	res.render('login');
});

router.get('/register', (req, res) => {
	res.render('register');
});

router.post('/register', (req, res, next) => {
	let user = {
		fullname: req.body.fullname,
		email: req.body.email,
		password: req.body.password,
	};
	console.log(user);
	let confirmPassword = req.body.confirmPassword;
	let keepLoggedIn = req.body.keepLoggedIn != undefined;

	if (user.password != confirmPassword) {
		return res.render('register', {
			message: 'Confirm password does not match',
		});
	}

	userController
		.getUserByEmail(user.email)
		.then((data) => {
			if (data) {
				return res.render('register', {
					message: `Email ${data.email} exist. Please choose another email`,
					type: 'alert-danger',
				});
			}
			userController.createUser(user).then((data) => {
				if (keepLoggedIn) {
					req.session.user = data;
					return res.render('/');
				} else {
					return res.render('login', {
						message: 'You have registered, now please login',
						type: 'alert-primary',
					});
				}
			});
		})
		.catch((err) => next(err));
});

router.post('/login', (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	userController
		.getUserByEmail(email)
		.then((user) => {
			if (user) {
				if (userController.comparePassword(password, user.password)) {
					req.session.user = user;
					if (req.session.returnURL) {
						res.redirect(req.session.returnURL);
					} else {
						res.redirect('/');
					}
				} else {
					return res.render('login', {
						message: 'Incorrect password',
						type: 'alert-danger',
					});
				}
			} else {
				return res.render('login', {
					message: 'Email does not exist',
					type: 'alert-danger',
				});
			}
		})
		.catch((err) => next(err));
});

router.get('/logout', (req, res, next) => {
	req.session.destroy((err) => {
		if (err) {
			return next(err);
		}
		return res.redirect('/products');
	});
});
module.exports = router;
