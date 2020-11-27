const Category = require('../models/categoryModel');

const catchAsync = require('../utils/catchAsync');
const { HTTPStatusCode, ErrorMessage } = require('./base');

module.exports.getAll = catchAsync(async (req, res) => {
	const records = await Category.find();

	if (!records)
        return res
            .status(HTTPStatusCode_CODE.NOT_FOUND)
            .json({ message: ErrorMessageSSAGE.NOT_FOUND });
    return res.status(HTTPStatusCode.SUCCESS).json({ result: records });
});
