const Product = require('./../models/productModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const { HTTP_STATUS_CODE, ERROR_MESSAGE } = require('./base');

module.exports.getTrendingProduct = catchAsync(async (req, res) => {
    const numItems =
        req.body.numItems || parseInt(process.env.TRENDING_PRODUCTS) || 8;

    const records = await Product.find()
        .sort({ ratingsAverage: 'desc' })
        .limit(numItems);

    if (!records)
        return res
            .status(HTTP_STATUS_CODE.NOT_FOUND)
            .json({ message: ERROR_MESSAGE.NOT_FOUND });
    return res.status(HTTP_STATUS_CODE.SUCCESS).json({ result: records });
});

module.exports.getTopProducts = catchAsync(async (req, res) => {
    const numItems = parseInt(process.env.TRENDING_PRODUCTS) || 8;

    const records = await Product.find()
        .sort({ ratingsAverage: 'desc' })
        .limit(numItems);
    if (!records)
        return res
            .status(HTTP_STATUS_CODE.NOT_FOUND)
            .json({ message: ERROR_MESSAGE.NOT_FOUND });
    return res.status(HTTP_STATUS_CODE.SUCCESS).json({ result: records });
});

module.exports.getTopSellingProducts = catchAsync(async (req, res) => {
    const numItems = parseInt(process.env.BEST_SELLER_PRODUCTS) || 8;

    const records = await Product.find()
        .sort({ ratingsQuantity: 'desc' })
        .limit(numItems);

    if (!records)
        return res
            .status(HTTP_STATUS_CODE.NOT_FOUND)
            .json({ message: ERROR_MESSAGE.NOT_FOUND });
    return res.status(HTTP_STATUS_CODE.SUCCESS).json({ result: records });
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
	
	if (!records)
        return res
            .status(HTTP_STATUS_CODE.NOT_FOUND)
            .json({ message: ERROR_MESSAGE.NOT_FOUND });
    return res.status(HTTP_STATUS_CODE.SUCCESS).json({ result: { products, length } });
});

module.exports.getTotalProduct = catchAsync(async (req, res) => {
    const records = await Product.find();
    if (!records)
        return res
            .status(HTTP_STATUS_CODE.NOT_FOUND)
            .json({ message: ERROR_MESSAGE.NOT_FOUND });
    return res.status(HTTP_STATUS_CODE.SUCCESS).json({ result: records });
});

module.exports.getProductById = catchAsync(async (req, res) => {
    const id = req.params.id;
	const record = await Product.findById(id);
	
    if (!record)
        return res
            .status(HTTP_STATUS_CODE.NOT_FOUND)
            .json({ message: ERROR_MESSAGE.NOT_FOUND });
    return res.status(HTTP_STATUS_CODE.SUCCESS).json({ result: record });
});

module.exports.getProductBySlug = catchAsync(async (req, res) => {
    const slug = req.params.slug;
    const record = await Product.findOne({ slug: slug });

    if (!record)
        return res
            .status(HTTP_STATUS_CODE.NOT_FOUND)
            .json({ message: ERROR_MESSAGE.NOT_FOUND });
    return res.status(HTTP_STATUS_CODE.SUCCESS).json({ result: record });
});
