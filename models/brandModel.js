/** @format */

const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	image: {
		type: String,
		default: 'category-1.png',
	}
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
