const { HTTPStatusCode, MESSAGE } = require('../utils/base');
const Product = require('./../models/productModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');

module.exports.getTrendingProduct = catchAsync(async (req, res) => {
	const numItems = req.body.numItems || parseInt(process.env.TRENDING_PRODUCTS) || 8;
	
	const records = await Product.find()
		.sort({ ratingsAverage: 'desc' })
		.limit(numItems);
		
	if (records) return res.status(HTTPStatusCode.OK).json({ result: {length: records.length, data: records }});
	return res
		.status(HTTPStatusCode.NOT_FOUND)
		.json({ message: MESSAGE.NOT_FOUND });
});

module.exports.getTopProducts = catchAsync(async (req, res) => {
	const numItems = parseInt(process.env.TRENDING_PRODUCTS) || 8;
	
	const records = await Product.find()
		.sort({ ratingsAverage: 'desc' })
		.limit(numItems)
	if (records) return res.status(HTTPStatusCode.OK).json({ result: records });
	return res
		.status(HTTPStatusCode.NOT_FOUND)
		.json({ message: MESSAGE.NOT_FOUND });
});

module.exports.getTopSellingProducts = catchAsync(async (req, res) => {
	const numItems = parseInt(process.env.BEST_SELLER_PRODUCTS) || 8;
	
	const records = await Product.find()
		.sort({ ratingsQuantity: 'desc' })
		.limit(numItems);

	if (records) return res.status(HTTPStatusCode.OK).json({ result: records });
	return res
		.status(HTTPStatusCode.NOT_FOUND)
		.json({ message: MESSAGE.NOT_FOUND });
});

module.exports.getAllProducts = catchAsync(async (req, res) => {
	const query = req.query;

		if (req.query.color == null || isNaN(req.query.color)) {
		req.query.color = 0;
	}

	if (req.query.brand == null || isNaN(req.query.brand)) {
		req.query.brand = 0;
	}

	if (req.query.category == null || isNaN(req.query.category)) {
		req.query.category = 0;
	}

	if (req.query.min == null || isNaN(req.query.min)) {
		req.query.min = 0;
	}

	if (req.query.max == null || isNaN(req.query.max)) {
		req.query.max = 150;
	}

	if (req.query.sort == null) {
		req.query.sort = 'name';
	}

	if (req.query.page == null || isNaN(req.query.page)) {
		req.query.page = 1;
	}

	if (req.query.limit == null || isNaN(req.query.limit)) {
		req.query.limit = 9;
	}

	if (req.query.search == null || req.query.search.trim() == '') {
		req.query.search = '';
	}
	
	let options = {
		price: {
			$gte: req.query.min,
			$lte: req.query.max,
		},
		name: {
			$regex: req.query.search,
		}
	};

	let sortOpt = {};
	let limitVal, offsetVal;

	if (req.query.category > 0) {
		options.category = req.query.category;
	}

	if (query.color > 0) {
		options.color = req.query.color;
	}

	if (query.brand > 0) {
		options.brand = req.query.brand;
	}

	if (query.limit > 0) {
		limitVal = parseInt(req.query.limit);
		offsetVal = parseInt(req.query.limit * (req.query.page - 1));
	}

	if (req.query.sort) {
		switch (req.query.sort) {
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

	const records = await Product.find(options).sort(sortOpt).limit(limitVal).skip(offsetVal);
	if (records) return res.status(HTTPStatusCode.OK).json({ result: records });
	return res
		.status(HTTPStatusCode.NOT_FOUND)
		.json({ message: MESSAGE.NOT_FOUND });
});

// module.exports.countProducts = (query) => {
// 	const query = req.query;
// 	let options = {
// 		price: {
// 			$gte: query.min,
// 			$lte: query.max,
// 		},
// 		name: {
// 			$regex: query.search,
// 		},
// 	};

// 	if (query.category > 0) {
// 		options.category = query.category;
// 	}

// 	if (query.color > 0) {
// 		options.color = query.color;
// 	}

// 	if (query.brand > 0) {
// 		options.brand = query.brand;
// 	}

// 	const records = await Product.countDocuments(options);
// 	if (records) return res.status(HTTPStatusCode.OK).json({ result: records });
// 	return res
// 		.status(HTTPStatusCode.NOT_FOUND)
// 		.json({ message: MESSAGE.NOT_FOUND });
// };

module.exports.getProductById = catchAsync(async(req, res) => {
	const id = req.params.id;
	const records = await Product.findById(id);
	if (records) return res.status(HTTPStatusCode.OK).json({ result: records });
	return res
		.status(HTTPStatusCode.NOT_FOUND)
		.json({ message: MESSAGE.NOT_FOUND });
});
