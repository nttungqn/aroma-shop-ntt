const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
	name: {
		type: String,
	},
});

const Color = mongoose.model('Color', colorSchema, 'colors');

module.exports = Color;
