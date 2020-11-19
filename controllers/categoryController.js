const Category = require('../models/categoryModel');

const catchAsync = require('../utils/catchAsync');

module.exports.getAll = catchAsync(async (req, res) => {
	const records = await Category.find();

	if (records) return res.status(200).json({ result: records });
	return res.status(404).json({
		message: 'Not found',
	});
});
