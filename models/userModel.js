/** @format */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, 'Please provide a fullname'],
	},
	image: {
		type: String,
		default: 'avatar-1.png',
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
	address: { 
		type: String,
		default: '225 Nguyen Van Cu Street',
	}
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
