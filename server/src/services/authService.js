const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");

const SECRET = process.env.SECRET;

exports.register = async function (username, email, rawPassword) {
	if (rawPassword.length < 6)
		throw new Error("Password should be at least 6 characters!");

	const password = await bcrypt.hash(rawPassword, 12);

	const existingUser = await User.findOne({ email });
	if (existingUser)
		throw new Error("User with this email address already exists!");

	const user = await User.create({ username, email, password });

	const token = await signToken(user._id, user.username, user.email);

	return { token, _id: user._id, username: user.username };
};

exports.login = async function (email, password) {
	const user = await User.findOne({ email });
	if (!user) throw new Error("Invalid email or password!");

	const isValid = await bcrypt.compare(password, user.password);
	if (!isValid) throw new Error("Invalid email or password!");

	const token = await signToken(user._id, user.username, user.email);

	return { token, _id: user._id, username: user.username };
};

function signToken(_id, username, email) {
	const payload = {
		_id,
		username,
		email,
	};

	const token = jwt.sign(payload, SECRET, { expiresIn: "6h" });

	return token;
}
