const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		title: {
			required: [true, "Title is required"],
			type: String,
		},
		category: {
			required: [true, "Category is required"],
			type: String,
		},
		description: {
			required: [true, "Description is required"],
			type: String,
		},
		image: {
			required: [true, "Image is required"],
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
		likes: {
			required: [true, "Likes is required"],
			type: Array,
		},
		comments: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Comment",
			},
		],
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
