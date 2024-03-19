const router = require("express").Router();
const authService = require("../services/authService");

router.post("/register", async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const { token, _id } = await authService.register(
			username,
			email,
			password
		);

		res.status(200).json({
			ok: true,
			message: "Registration successful",
			token,
			_id,
			username,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error?.message,
		});
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const { token, _id, username } = await authService.login(
			email,
			password
		);

		res.status(200).json({
			ok: true,
			message: "Login successful",
			token,
			_id,
			username,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error?.message,
		});
	}
});

router.get("/logout", (req, res) => {
	try {
		res.status(200).json({
			ok: true,
			message: "Logout successful",
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: "Logout failed",
			error,
		});
	}
});

module.exports = router;
