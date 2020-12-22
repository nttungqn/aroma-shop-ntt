const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		message: {
			type: String,
			required: [true, "Comment not empty"],
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Comment must belong ti a user"],
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: [true, "Comment must belong a product"],
		},
		parentCommentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
			default: undefined,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

commentSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'userId',
		select: 'name image',
	});


	this.populate({
		path: 'parentCommentId',
		select: 'message',
	});

	next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
