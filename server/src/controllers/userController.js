const router = require("express").Router();
const userService = require("../services/userService");

router.get("/top", async (req, res) => {
	try {
		let users = await userService.getTop();

		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error.message,
		});
	}
});

router.get("/:userId", async (req, res) => {
	try {
		const userId = req.params.userId;

		let user = await userService.getOne(userId);

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error.message,
		});
	}
});

module.exports = router;
