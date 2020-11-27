const Color = require('../models/colorModel');

const catchAsync = require('../utils/catchAsync');
const { HTTPStatusCode, ErrorMessage } = require('./base');

module.exports.getAll = catchAsync(async (req, res) => {
	const records = await Color.find();

	if (!records)
        return res
            .status(HTTPStatusCode.NOT_FOUND)
            .json({ message: ErrorMessage.NOT_FOUND });
    return res.status(HTTPStatusCode.SUCCESS).json({ result: records });
});

