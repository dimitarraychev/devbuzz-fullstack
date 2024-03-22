const router = require("express").Router();
const authService = require("../services/authService");

const validationRegex = new RegExp(/:\s([A-Z][\w\s]+!)/);
const removePassword = (user) => {
	const { password, __v, ...userData } = user;
	return userData;
};

router.post("/register", async (req, res) => {
	try {
		const { username, email, password } = req.body;

		let { token, user } = await authService.register(
			username,
			email,
			password
		);

		user = removePassword(user);

		res.status(201).json({
			ok: true,
			message: "Registration successful.",
			token,
			user,
		});
	} catch (error) {
		error.message =
			error.message.match(validationRegex)?.[1] ?? error.message;

		res.status(400).json({
			ok: false,
			message: error.message,
		});
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		let { token, user } = await authService.login(email, password);

		user = removePassword(user);

		res.status(200).json({
			ok: true,
			message: "Login successful.",
			token,
			user,
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error.message,
		});
	}
});

router.get("/authenticate", async (req, res) => {
	try {
		const _id = req.user._id;

		let user = await authService.authenticate(_id);

		user = removePassword(user);

		res.status(200).json({
			ok: true,
			message: "Authentication successful.",
			user,
		});
	} catch (error) {
		res.status(401).json({
			ok: false,
			message: "Authentication failed: Not logged in. " + error.message,
		});
	}
});

router.get("/logout", (req, res) => {
	try {
		res.status(200).json({
			ok: true,
			message: "Logout successful.",
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: "Logout failed." + error.message,
		});
	}
});

module.exports = router;
