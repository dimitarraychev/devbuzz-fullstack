const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username is required!"],
		minLength: [3, "Username should be between 3 and 20 characters!"],
		maxLength: [20, "Username should be between 3 and 20 characters!"],
		validate: {
			validator: function (value) {
				const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
				return !specialCharacterRegex.test(value);
			},
			message: "Username should not contain special characters!",
		},
	},
	email: {
		required: [true, "Email is required!"],
		minLength: [9, "Email should be between 9 and 30 characters!"],
		maxLength: [30, "Email should be between 9 and 30 characters!"],
		match: [
			/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
			"Email address is not valid!",
		],
		type: String,
		lowercase: true,
		unique: true,
	},
	password: {
		required: [true, "Password is required!"],
		type: String,
	},
	posts: [
		{
			type: mongoose.Types.ObjectId,
			ref: "Post",
		},
	],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
