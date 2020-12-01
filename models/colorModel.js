/** @format */

const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
	_id: {
		type: Number,
	},
	name: {
		type: String,
	},
});

const Color = mongoose.model('Color', colorSchema, 'colors');

module.exports = Color;
