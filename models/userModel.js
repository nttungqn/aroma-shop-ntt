const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true
	},
	fullname: {
		type: String,
		require: [true, 'Please provide a fullname'],
	},
	email: {
		type: String,
		unique: true,
		require: [true, 'Please provide your mail'],
	},
	password: {
		type: String,
		require: [true, 'Please provide a password'],
	},
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
