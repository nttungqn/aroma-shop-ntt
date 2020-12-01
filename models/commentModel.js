const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		_id: {
            type: Number,
            required: true,
		},
		message: {
			type: String,
			required: [true, "Comment not empty"],
		},
		user: {
			type: Number,
			ref: "User",
			required: [true, "Comment must belong ti a user"],
		},
		product: {
			type: Number,
			ref: "Product",
			required: [true, "Comment must belong a product"],
		},
		parentComment: {
			type: Number,
			ref: "Comment",
			required: false,
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

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
