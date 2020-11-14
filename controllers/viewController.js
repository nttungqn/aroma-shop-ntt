const axios = require('axios')

const AppError = require('./../utils/AppError');
const Product = require('./../models/productModel');
const Brand = require('./../models/brandModel');
const Color = require('./../models/colorModel');
const Category = require('./../models/categoryModel');

const catchAsync = require('./../utils/catchAsync');

// 1) Get tour data from collection
// 2) Build template
// 3) Render that template using tour data from 1)

module.exports.getOverview = catchAsync(async (req, res, next) => {
	const categories = await axios({
		method: 'GET',
		url: '/api/categories'
	});
	const trendingProducts = await axios({
		method: 'GET',
		url: '/api/products/trending-products',
    });
    const topSellingProducts = await axios({
        method: 'GET',
		url: '/api/products/top-selling-products',
    });
    
	res.status(200).render('index', {
		categories,
		trendingProducts,
		topSellingProducts,
	});
});

// module.exports.getShopCategory = catchAsync(async (req, res, next) => {
// 	const categories = await axios({
// 		method: 'GET',
// 		url: '/api/categories'
// 	});

// 	const brands = await axios({
// 		method: 'GET',
// 		url: '/api/brands'
// 	});
    
//     const trendingProducts = await axios({
// 		method: 'GET',
//         url: '/api/products/trending-products',
//         data: {
//             numItems: 12
//         }
//     });
//     const colors = await axios({
// 		method: 'GET',
//         url: '/api/colors',
//     });
//     const products = await axios({
//         method: 'GET',
//         url: '/api/products/trending-products',
//         data: req.query
//     })
    
// 	const count = await productController.countProducts(req.query);
// 	const topProduct1 = await productController.getTopProducts(3, 0);
// 	const topProduct2 = await productController.getTopProducts(3, 3);
// 	const topProduct3 = await productController.getTopProducts(3, 6);
// 	const topProduct4 = await productController.getTopProducts(3, 9);

// 	res.status(200).render('category', {
// 		query: req.query,
// 		categories,
// 		brands,
// 		colors,
// 		trendingProducts,
// 		products,
// 		banner: 'Shop Category',
// 		bannerPage: 'Shop Category',
// 		totalPages: Math.ceil(count / req.query.limit),
// 		current: req.query.page,
// 		pagination: {
// 			page: parseInt(req.query.page),
// 			limit: parseInt(req.query.limit),
// 			totalRows: parseInt(count),
// 		},
// 		topProduct1,
// 		topProduct2,
// 		topProduct3,
// 		topProduct4,
// 	});
// });

// module.exports.getDetailProduct = catchAsync(async (req, res, next) => {
// 	const product = await Product.findOne({ slug: req.params.slug });

// 	if (!product) {
// 		return next(new AppError('Not product found with that ID', 404));
// 	}

// 	const topProduct1 = await productController.getTopProducts(3, 0);
// 	const topProduct2 = await productController.getTopProducts(3, 3);
// 	const topProduct3 = await productController.getTopProducts(3, 6);
// 	const topProduct4 = await productController.getTopProducts(3, 9);

// 	res.status(200).render('single-product', {
// 		product,
// 		bannerPage: 'Shop Single',
// 		banner: 'Shop Single',
// 		topProduct1,
// 		topProduct2,
// 		topProduct3,
// 		topProduct4,
// 	});
// });
