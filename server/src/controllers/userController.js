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
		const limit = parseInt(req.query.limit) || 6;
		const page = parseInt(req.query.page) || 1;
		const skip = (page - 1) * limit;

		let { user, totalPosts } = await userService.getOne(
			userId,
			limit,
			skip
		);

		const totalPages = Math.ceil(totalPosts / limit) || 1;

		res.status(200).json({ user, page, totalPages });
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error.message,
		});
	}
});

module.exports = router;
