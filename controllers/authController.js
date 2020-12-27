const passport = require('passport');

module.exports.getLogin = (req, res) => {
	req.session.returnURL = req.query.returnURL;
	res.render('login', {
		banner: 'Log In',
		message: req.flash('error')[0] || '',
	});
}

module.exports.postLogin = (req, res, next) => {
	passport.authenticate('local-login', {
		successRedirect: req.session.returnURL || '/',
		failureRedirect: '/login',
		failureFlash: true
	})(req, res, next);
}

module.exports.logout = (req, res) => {
	if (req.session.cart) {
		req.session.cart = null;
	}
	req.logout();
	res.redirect("/")
}

module.exports.getSignUp = (req, res) => {
	res.status(200).render('sign-up', { 
		banner: 'Sign up',
		message: req.flash('error')[0] || '',
	});
}

module.exports.postSignUp = (req, res, next) => {
	passport.authenticate('local-signup', {
		successRedirect: '/login',
		failureRedirect: '/sign-up',
		failureFlash: true
	})(req, res, next);
}

module.exports.protect = (req, res, next) => {
	if (req.user || req.session.user) 
		next();
	next('You are not logged in! Please log in to get access.', 401)
}
