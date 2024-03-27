const router = require("express").Router();
const authService = require("../services/authService");

const validationRegex = new RegExp(/:\s([A-Z][\w\s]+!)/);

router.post("/register", async (req, res) => {
	try {
		const { username, email, password } = req.body;

		let { token, user } = await authService.register(
			username,
			email,
			password
		);

		res.status(201).json({
			ok: true,
			message: "Registration successful.",
			token,
			user,
		});
	} catch (error) {
		if (error.message.includes("email address already exists!")) {
			return res.status(409).json({
				ok: false,
				message: error.message,
			});
		}

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

		res.status(200).json({
			ok: true,
			message: "Authentication successful.",
			user,
		});
	} catch (error) {
		res.status(204).end();
	}
});

router.get("/logout", async (req, res) => {
	try {
		const token = req.token;

		await authService.logout(token);

		res.status(204).end();
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: "Logout failed.",
		});
	}
});

module.exports = router;
