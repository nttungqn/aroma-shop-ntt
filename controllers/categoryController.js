const Category = require('../models/categoryModel');

module.exports.getAll = (query) => {
	return new Promise((resolve, reject) => {
		let options = {};

		Category.find(options)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};
