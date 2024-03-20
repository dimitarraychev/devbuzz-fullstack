const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		title: {
			required: [true, "Title is required!"],
			minLength: [10, "Title should be between 10 and 100 characters!"],
			maxLength: [100, "Title should be between 10 and 100 characters!"],
			type: String,
		},
		category: {
			required: [true, "Category is required!"],
			type: String,
		},
		description: {
			required: [true, "Description is required!"],
			minLength: [
				50,
				"Description should be between 50 and 3000 characters!",
			],
			maxLength: [
				3000,
				"Description should be between 50 and 3000 characters!",
			],
			type: String,
		},
		image: {
			required: [true, "Image is required"],
			match: [
				/^https?:\/\//,
				"Image should start with http:// or https://!",
			],
			type: String,
		},
		owner: {
			required: [true, "Owner is required!"],
			type: {
				_id: {
					required: [true, "Owner _id is required!"],
					type: String,
				},
				username: {
					required: [true, "Owner name is required!"],
					type: String,
				},
			},
		},
		likes: {
			required: [true, "Likes is required!"],
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
