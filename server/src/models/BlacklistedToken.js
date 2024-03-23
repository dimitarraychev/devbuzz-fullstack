const mongoose = require("mongoose");

const blacklistedTokenSchema = new mongoose.Schema(
	{
		token: String,
	},
	{ timestamps: true }
);

const BlacklistedToken = mongoose.model(
	"BlacklistedToken",
	blacklistedTokenSchema
);

module.exports = BlacklistedToken;
