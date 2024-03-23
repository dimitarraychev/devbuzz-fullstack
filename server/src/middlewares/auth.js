const jwt = require("../lib/jwt");
const authService = require("../services/authService");

const SECRET = process.env.SECRET;

exports.auth = async (req, res, next) => {
	const token = req.headers.authorization?.replace("Bearer ", "");

	if (!token) return next();

	try {
		const decodedToken = await jwt.verify(token, SECRET);

		await authService.checkBlacklist(token);

		req.token = token;
		req.user = decodedToken;

		next();
	} catch (error) {
		return res.status(401).json({
			ok: false,
			message: "Authentication failed: Invalid token. " + error.message,
		});
	}
};

exports.isAuth = (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({
			success: false,
			message: "Authentication failed: User not authenticated.",
		});
	}

	next();
};
