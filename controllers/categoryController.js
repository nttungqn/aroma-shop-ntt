const Category = require('../models/categoryModel');
const catchAsync = require('./../utils/catchAsync');

module.exports.getAll = catchAsync(async() => {
	return new Promise((resolve, reject) => {
		let options = {};

		Category.find(options)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
});
