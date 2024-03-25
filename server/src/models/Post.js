const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required!"],
			minLength: [10, "Title should be between 10 and 100 characters!"],
			maxLength: [100, "Title should be between 10 and 100 characters!"],
			validate: {
				validator: function (value) {
					const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
					return !specialCharacterRegex.test(value);
				},
				message: "Title should not contain special characters!",
			},
		},
		category: {
			type: String,
			required: [true, "Category is required!"],
		},
		description: {
			type: String,
			required: [true, "Description is required!"],
			minLength: [
				50,
				"Description should be between 50 and 3000 characters!",
			],
			maxLength: [
				3000,
				"Description should be between 50 and 3000 characters!",
			],
		},
		image: {
			type: String,
			required: [true, "Image is required"],
			match: [
				/^https?:\/\//,
				"Image should start with http:// or https://!",
			],
		},
		owner: {
			required: [true, "Owner is required!"],
			type: {
				_id: {
					type: String,
					required: [true, "Owner _id is required!"],
				},
				username: {
					type: String,
					required: [true, "Owner name is required!"],
				},
			},
		},
		likes: {
			type: Array,
			required: [true, "Likes is required!"],
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
