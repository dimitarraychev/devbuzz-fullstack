const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		message: {
			required: [true, "Comment is required"],
			minLength: [5, "Comment should be between 5 and 300 characters!"],
			maxLength: [300, "Comment should be between 5 and 300 characters!"],
			type: String,
		},
		_postId: {
			required: [true, "_postId is required"],
			type: String,
		},
		owner: {
			required: [true, "Owner is required"],
			type: {
				_id: {
					required: [true, "Owner _id is required"],
					type: String,
				},
				username: {
					required: [true, "Owner name is required"],
					type: String,
				},
			},
		},
	},
	{ timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
