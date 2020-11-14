const User = require('./../models/userModel');
const bcrypt = require('bcryptjs');

module.exports.getUserByEmail = (email) => {
	return new Promise((resolve, reject) => {
		User.findOne({ email: email })
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};

module.exports.createUser = async (user) => {
	var salt = bcrypt.genSaltSync(10);
	user.password = bcrypt.hashSync(user.password, salt);
	return await User.create(user);
};

module.exports.comparePassword = (password, hash) => {
	return bcrypt.compareSync(password, hash);
};
