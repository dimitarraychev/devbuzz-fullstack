const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		comment: {
			required: [true, "Comment is required"],
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
