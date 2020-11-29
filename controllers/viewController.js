const axios = require('axios');

const AppError = require('./../utils/AppError');
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const Brand = require('../models/brandModel');
const Color = require('../models/colorModel');
const catchAsync = require('./../utils/catchAsync');
axios.defaults.baseURL = process.env.BASE_URL;

// 1) Get tour data from collection
// 2) Build template
// 3) Render that template using tour data from 1)

exports.getOverview = catchAsync(async (req, res, next) => {
    const categories = await Category.find();

    const trendingProducts = await Product.find()
        .sort({ ratingsAverage: 'desc' })
        .limit(parseInt(process.env.TRENDING_PRODUCTS) || 8);

    const topSellingProducts = await Product.find()
        .sort({ ratingsQuantity: 'desc' })
        .limit(parseInt(process.env.BEST_SELLER_PRODUCTS) || 8);

    res.status(200).render('index', {
        categories: categories,
        bestSellerProducts: topSellingProducts,
        trendingProducts: trendingProducts,
    });
});

module.exports.getShopCategory = catchAsync(async (req, res, next) => {
    const categories = await Category.find();

    const brands = await Brand.find();

    const trendingProducts = await Product.find()
        .sort({ ratingsAverage: 'desc' })
        .limit(12);

    const colors = await Color.find();

    const products = await Product.find();

	const length = products.length;

    res.status(200).render('category', {
        query: req.query,
        categories,
        brands,
        colors,
        trendingProducts,
        products,
        banner: 'Shop Category',
        bannerPage: 'Shop Category',
        totalPages: Math.ceil(length / req.query.limit),
        current: req.query.page,
        pagination: {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 9,
            totalRows: parseInt(length),
        },
        topProduct1: trendingProducts.slice(0, 3),
        topProduct2: trendingProducts.slice(3, 6),
        topProduct3: trendingProducts.slice(6, 9),
        topProduct4: trendingProducts.slice(9, 12),
    });
});

module.exports.getDetailProduct = catchAsync(async (req, res, next) => {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug: slug });

    if (!product) {
        return next(new AppError('Not product found with that ID', 404));
    }

    const trendingProducts = await Product.find()
        .sort({ ratingsAverage: 'desc' })
        .limit(12);

    res.status(200).render('single-product', {
        product,
        bannerPage: 'Shop Single',
        banner: 'Shop Single',
        topProduct1: trendingProducts.slice(0, 3),
        topProduct2: trendingProducts.slice(3, 6),
        topProduct3: trendingProducts.slice(6, 9),
        topProduct4: trendingProducts.slice(9, 12),
    });
});
