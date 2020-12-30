const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

DEFAULT_ADDRESS = '225 Nguyen Van Cu Street';
DEFAULT_PHONE_NUMBER = '0905500456';
DEFAULT_AVATAR = 'avatar-1.png';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, 'Please provide a fullname'],
	},
	image: {
		type: String,
		default: DEFAULT_AVATAR,
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
		default: DEFAULT_ADDRESS,
	},
	salt: {
		type: String
	},
	phone: {
		type: String,
		default: DEFAULT_PHONE_NUMBER
	},
	status: {
		type: Boolean,
		default: false
	},
});

// gensalt
userSchema.pre('save', async function(next) {
	this.salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, this.salt);
	next();
  });
  
userSchema.methods.correctPassword = async function(
	candidatePassword,
	userPassword
  ) {
	return await bcrypt.compare(candidatePassword, userPassword);
};
  
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
