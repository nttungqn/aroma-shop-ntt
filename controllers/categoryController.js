const Category = require('../models/categoryModel');

const catchAsync = require('../utils/catchAsync');
const { HTTP_STATUS_CODE, ERROR_MESSAGE } = require('./base');

module.exports.getAll = catchAsync(async (req, res) => {
	const records = await Category.find();

	if (!records)
        return res
            .status(HTTP_STATUS_CODE_CODE.NOT_FOUND)
            .json({ message: ERROR_MESSAGESSAGE.NOT_FOUND });
    return res.status(HTTP_STATUS_CODE.SUCCESS).json({ result: records });
});
