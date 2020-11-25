const { HTTPStatusCode, MESSAGE } = require("../utils/base");
const Product = require("./../models/productModel");
const AppError = require("./../utils/AppError");
const catchAsync = require("./../utils/catchAsync");

module.exports.getTrendingProduct = catchAsync(async (req, res) => {
	const numItems =
		req.body.numItems || parseInt(process.env.TRENDING_PRODUCTS) || 8;

	const records = await Product.find()
		.sort({ ratingsAverage: "desc" })
		.limit(numItems);

	if (records) return res.status(200).json({ result: records });
	return res.status(404).json({ message: "Not found" });
});

module.exports.getTopProducts = catchAsync(async (req, res) => {
	const numItems = parseInt(process.env.TRENDING_PRODUCTS) || 8;

	const records = await Product.find()
		.sort({ ratingsAverage: "desc" })
		.limit(numItems);
	if (records)
		return res
			.status(200)
			.json({ result: records });
	return res.status(404).json({ message: "Not found" });
});

module.exports.getTopSellingProducts = catchAsync(async (req, res) => {
	const numItems = parseInt(process.env.BEST_SELLER_PRODUCTS) || 8;

	const records = await Product.find()
		.sort({ ratingsQuantity: "desc" })
		.limit(numItems);

	if (records)
		return res.status(200).json({ result: records });
	return res.status(404).json({ message: "Not found" });
});

module.exports.getAll = catchAsync(async (req, res) => {
	let query = req.query;
	let options = {
		price: {
			$gte: query.min,
			$lte: query.max,
		},
		name: {
			$regex: String(query.search),
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

	const records = await Product.find(options).sort(sortOpt);
	const products = records.slice(offsetVal, offsetVal + limitVal);
	const length = records.length;
	if (records) return res.status(200).json({ result: {products, length}});
	return res.status(404).json({ message: "Not found" });
});

module.exports.getTotalProduct = catchAsync(async (req, res) => {
	const records = await Product.find();
	return res.status(200).json({ result: records });
})

module.exports.getProductById = catchAsync(async (req, res) => {
	const id = req.params.id;
	const records = await Product.findById(id);
	if (records) return res.status(200).json({ result: records });
	return res.status(404).json({ message: "Not found" });
});

module.exports.getProductBySlug = catchAsync(async (req, res) => {
	const slug = req.params.slug;
	const records = await Product.findOne({ slug: slug});
	
	if (records) return res.status(200).json({ result: records });
	return res.status(404).json({ message: "Not found" });
})