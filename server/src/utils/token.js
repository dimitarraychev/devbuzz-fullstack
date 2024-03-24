const jwt = require("../lib/jwt");
const SECRET = process.env.SECRET;

exports.generateToken = (_id, username, email) => {
	const payload = {
		_id,
		username,
		email,
	};

	const token = jwt.sign(payload, SECRET, { expiresIn: "1d" });

	return token;
};
