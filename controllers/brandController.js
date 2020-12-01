const Brand = require('../models/brandModel');

module.exports.getAll = (query) => {
	return new Promise((resolve, reject) => {
		Brand.find()
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};
