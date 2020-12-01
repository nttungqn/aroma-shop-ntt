const Product = require('./../models/productModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');

module.exports.getTrendingProduct = (numItems) => {
	// treding products
	return new Promise((resolve, reject) => {
		Product.find()
			.sort({ ratingsAverage: 'desc' })
			.limit(numItems)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};

module.exports.getTopProducts = (numItems, skip) => {
	return new Promise((resolve, reject) => {
		Product.find()
			.sort({ ratingsAverage: 'desc' })
			.limit(numItems)
			.skip(skip)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};

module.exports.getBestSellerProduct = (numItems) => {
	return new Promise((resolve, reject) => {
		Product.find()
			.sort({ ratingsQuantity: 'desc' })
			.limit(numItems)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};

module.exports.getAll = (query) => {
	return new Promise((resolve, reject) => {
		let options = {
			price: {
				$gte: query.min,
				$lte: query.max,
			},
			name: {
				$regex: query.search,
			},
		};

		let sortOpt = {};
		let limitVal, offsetVal;

		if (query.category > 0) {
			options.category = query.category;
		}

		if (query.color > 0) {
			options.color = query.color;
		}

		if (query.brand > 0) {
			options.brand = query.brand;
		}

		if (query.limit > 0) {
			limitVal = parseInt(query.limit);
			offsetVal = parseInt(query.limit * (query.page - 1));
		}

		if (query.sort) {
			switch (query.sort) {
				case 'name':
					sortOpt.name = 'asc';
					break;
				case 'price':
					sortOpt.price = 'asc';
					break;
				case 'ratingsAverage':
					sortOpt.ratingsAverage = 'asc';
					break;
				default:
					sortOpt.name = 'asc';
					break;
			}
		}

		Product.find(options)
			.sort(sortOpt)
			.limit(limitVal)
			.skip(offsetVal)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new AppError(err.message, 404)));
	});
};

module.exports.countProducts = (query) => {
	return new Promise((resolve, reject) => {
		let options = {
			price: {
				$gte: query.min,
				$lte: query.max,
			},
			name: {
				$regex: query.search,
			},
		};

		if (query.category > 0) {
			options.category = query.category;
		}

		if (query.color > 0) {
			options.color = query.color;
		}

		if (query.brand > 0) {
			options.brand = query.brand;
		}

		Product.countDocuments(options)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new AppError(err.message, 404)));
	});
};

module.exports.getProductById = (id) => {
	return new Promise((resolve, reject) => {
		Product.findById(id)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};
