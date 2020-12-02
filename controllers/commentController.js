const Comment = require('../models/commentModel');

module.exports.add = (comment) => {
	return new Promise((resolve, reject) => {
		Comment.create(comment)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};
