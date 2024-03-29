const router = require("express").Router();
const { isAuth } = require("../middlewares/auth");
const commentService = require("../services/commentService");
const postService = require("../services/postService");

const validationRegex = new RegExp(/:\s([A-Z][\w\s]+!)/);

router.post("/", isAuth, async (req, res) => {
	try {
		const { username, _id } = req.user;

		const commentData = {
			...req.body,
			owner: {
				_id,
				username,
			},
		};

		const post = await commentService.add(commentData);

		res.status(201).json(post);
	} catch (error) {
		error.message =
			error.message.match(validationRegex)?.[1] ?? error.message;

		res.status(400).json({
			ok: false,
			message: error.message,
		});
	}
});

router.delete("/:commentId", isAuth, async (req, res) => {
	try {
		const commentId = req.params.commentId;
		const userId = req.user._id;

		const post = await commentService.delete(commentId, userId);

		res.status(200).json(post);
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error.message,
		});
	}
});

module.exports = router;
