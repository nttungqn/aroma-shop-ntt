/** @format */
const catchAsync = require('./../utils/catchAsync');
const productController = require('./../controllers/productController');
const brandController = require('./../controllers/brandController');
const categoryController = require('./../controllers/categoryController');
const commentController = require('./../controllers/commentController');
const AppError = require('./../utils/AppError');
const Product = require('./../models/productModel');
const Brand = require('./../models/brandModel');
const Color = require('./../models/colorModel');
const Category = require('./../models/categoryModel');
const Comment = require('./../models/commentModel');
const passport = require('passport');

// 1) Get tour data from collection
// 2) Build template
// 3) Render that template using tour data from 1)
const COMMENTS_PER_PAGE = 3;

module.exports.getOverview = catchAsync(async (req, res, next) => {
	const categories = await categoryController.getAll();
	const trendingProducts = await productController.getTrendingProduct(8);
	const bestSellerProducts = await productController.getBestSellerProduct(8);

	res.status(200).render('home', {
		categories,
		trendingProducts,
		bestSellerProducts,
	});
});

module.exports.getShopCategory = catchAsync(async (req, res, next) => {
	const categories = await categoryController.getAll();
	const brands = await brandController.getAll();
	const trendingProducts = await productController.getTrendingProduct(12);
	const colors = await Color.find();

	colorParam = parseInt(req.query.color, 10);
	req.query.color = isNaN(colorParam) ? 0 : colorParam;

	brandParam = parseInt(req.query.brand, 10);
	req.query.brand = isNaN(brandParam) ? 0 : brandParam;

	categoryParam = parseInt(req.query.category, 10);
	req.query.category = isNaN(categoryParam) ? 0 : categoryParam;

	minParam = parseInt(req.query.min, 10);
	req.query.min = isNaN(minParam) ? 0 : minParam;

	maxParam = parseInt(req.query.max, 10);
	req.query.max = isNaN(maxParam) ? 150 : maxParam;

	
	pageParam = parseInt(req.query.page, 10);
	req.query.page = isNaN(pageParam) ? 1 : pageParam;
	
	limitParam = parseInt(req.query.limit, 10);
	req.query.limit = isNaN(limitParam) ? 9 : limitParam;
	
	if (req.query.sort == null) {
		req.query.sort = 'name';
	}
	if (req.query.search == null || req.query.search.trim() == '') {
		req.query.search = '';
	}

	const products = await productController.getAll(req.query);
	const count = await productController.countProducts(req.query);
	const topProduct1 = await productController.getTopProducts(3, 0);
	const topProduct2 = await productController.getTopProducts(3, 3);
	const topProduct3 = await productController.getTopProducts(3, 6);
	const topProduct4 = await productController.getTopProducts(3, 9);

	res.status(200).render('shop', {
		query: req.query,
		categories,
		brands,
		colors,
		trendingProducts,
		products,
		banner: 'Shop',
		bannerPage: 'Shop',
		totalPages: Math.ceil(count / req.query.limit),
		current: req.query.page,
		pagination: {
			page: parseInt(req.query.page),
			limit: parseInt(req.query.limit),
			totalRows: parseInt(count),
		},
		topProduct1,
		topProduct2,
		topProduct3,
		topProduct4,
	});
});

module.exports.getDetailProduct = catchAsync(async (req, res, next) => {
	const product = await Product.findOne({ _id: req.params.id });
	
	if (!product) {
		return next(new AppError('Not product found with that ID', 404));
	}
	
	const totalComments = await Comment.find({productId: req.params.id});
	const count = totalComments.length > 0 ? totalComments.length : undefined;
	
	if (req.query.page == null || isNaN(req.query.page)) {
		req.query.page = 1;
	}
	
	if (req.query.limit == null || isNaN(req.query.limit)) {
		req.query.limit = COMMENTS_PER_PAGE;
	}
	const comments = await commentController.getCommentByProductId(req.query, req.params.id);
	
	const topProduct1 = await productController.getTopProducts(3, 0);
	const topProduct2 = await productController.getTopProducts(3, 3);
	const topProduct3 = await productController.getTopProducts(3, 6);
	const topProduct4 = await productController.getTopProducts(3, 9);

	res.status(200).render('single-product', {
		product,
		comments,
		bannerPage: 'Shop Single',
		banner: 'Shop Single',
		topProduct1,
		topProduct2,
		topProduct3,
		topProduct4,
		current: req.query.page,
		pagination: {
			page: parseInt(req.query.page),
			limit: parseInt(req.query.limit),
			totalRows: parseInt(count),
		},
	});
});


module.exports.getLoginView = (req, res) => {
	res.render('login');
}

module.exports.handleLogin = async (req, res, next) => {
	console.log('Login 11111111111');
	await passport.authenticate('local-login', { successRedirect: '/', failureRedirect: '/login' })(req, res, next);
}

module.exports.getRegisterView = (req, res) => {
	res.render('register')
}