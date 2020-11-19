const axios = require('axios')

const AppError = require('./../utils/AppError');
const Product = require('./../models/productModel');
const Brand = require('./../models/brandModel');
const Color = require('./../models/colorModel');
const Category = require('./../models/categoryModel');

const catchAsync = require('./../utils/catchAsync');
axios.defaults.baseURL = process.env.BASE_URL;

// 1) Get tour data from collection
// 2) Build template
// 3) Render that template using tour data from 1)

exports.getOverview = catchAsync(async (req, res, next) => {
	const categories = (await axios({
		method: 'GET',
		url: '/api/categories'
	})).data.result;
	const trendingProducts = (await axios({
		method: 'GET',
		url: '/api/products/trending-products',
    })).data.result;
    const topSellingProducts = (await axios({
        method: 'GET',
		url: '/api/products/top-selling-products',
	})).data.result;

	res.status(200).render('index',{
		categories: categories,
		bestSellerProducts: topSellingProducts,
		trendingProducts: trendingProducts,
	});
});

module.exports.getShopCategory = catchAsync(async (req, res, next) => {
	const categories = (await axios({
		method: 'GET',
		url: '/api/categories'
	})).data.result;

	const brands = (await axios({
		method: 'GET',
		url: '/api/brands'
	})).data.result;
    
    const trendingProducts = (await axios({
		method: 'GET',
        url: '/api/products/trending-products',
        data: {
            numItems: 12
        }
	})).data.result;
	
    const colors = (await axios({
		method: 'GET',
        url: '/api/colors',
	})).data.result;
	
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
	
    const productResult = (await axios({
        method: 'GET',
        url: '/api/products/',
        params: req.query
	})).data.result;
	
	const products = productResult.products;
	const length = productResult.length;

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
			page: parseInt(req.query.page),
			limit: parseInt(req.query.limit),
			totalRows: parseInt(length),
		},
		topProduct1: trendingProducts.slice(0, 3),
		topProduct2: trendingProducts.slice(3, 6),
		topProduct3: trendingProducts.slice(6, 9),
		topProduct4: trendingProducts.slice(9, 12)
	});
});

module.exports.getDetailProduct = catchAsync(async (req, res, next) => {
	const product = await Product.findOne({ slug: req.params.slug });

	if (!product) {
		return next(new AppError('Not product found with that ID', 404));
	}

	const topProduct1 = await productController.getTopProducts(3, 0);
	const topProduct2 = await productController.getTopProducts(3, 3);
	const topProduct3 = await productController.getTopProducts(3, 6);
	const topProduct4 = await productController.getTopProducts(3, 9);

	res.status(200).render('single-product', {
		product,
		bannerPage: 'Shop Single',
		banner: 'Shop Single',
		topProduct1,
		topProduct2,
		topProduct3,
		topProduct4,
	});
});
