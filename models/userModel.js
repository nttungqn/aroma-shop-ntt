const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true
	},
	username: {
		type: String,
		required: [true, 'Please provide user name']
	},
	fullname: {
		type: String,
		require: [true, 'Please provide a fullname'],
	},
	email: {
		type: String,
		unique: true,
		require: [true, 'Please provide your mail'],
		validate: [validator.isEmail, 'Please provide a valid email']
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
	password: {
		type: String,
		require: [true, 'Please provide a password'],
	},
	phone: {
		type: Number,
	},
	address: {
		type: String
	}
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
