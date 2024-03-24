const User = require("../models/User");
const BlacklistedToken = require("../models/BlacklistedToken");

const bcrypt = require("bcrypt");

const { generateToken } = require("../utils/token");
const { sanitizeUserObject } = require("../utils/sanitize");

exports.register = async function (username, email, rawPassword) {
	if (rawPassword.length < 6)
		throw new Error("Password should be at least 6 characters!");

	const password = await bcrypt.hash(rawPassword, 12);

	const existingUser = await User.findOne({ email });
	if (existingUser)
		throw new Error("User with this email address already exists!");

	const user = await User.create({ username, email, password }).lean();

	const token = await generateToken(user._id, user.username, user.email);

	return { token, user: sanitizeUserObject(user) };
};

exports.login = async function (email, password) {
	const user = await User.findOne({ email }).lean();
	if (!user) throw new Error("Invalid email or password!");

	const isValid = await bcrypt.compare(password, user.password);
	if (!isValid) throw new Error("Invalid email or password!");

	const token = await generateToken(user._id, user.username, user.email);

	return { token, user: sanitizeUserObject(user) };
};

exports.authenticate = async (userId) => {
	const user = await User.findOne(
		{ _id: userId },
		{ password: 0, __v: 0 }
	).lean();
	return sanitizeUserObject(user);
};

exports.logout = (token) => BlacklistedToken.create({ token });

exports.checkBlacklist = async (token) => {
	const isBlacklisted = await BlacklistedToken.findOne({ token });
	if (isBlacklisted) throw new Error("Blacklisted token.");
	return token;
};
