const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

exports.getAll = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.find();
        return doc;
    });