const Color = require('./../models/colorModel')

module.exports.getAll = catchAsync(async(req, res) => {
    const records = await Brand.find();
	
	if(records){
		res.status(HTTPStatusCode.OK).json({result: records})
	}
	res.status(HTTPStatusCode.NOT_FOUND).json({message: MESSAGE.RECORD_DOES_NOT_EXIST})
})