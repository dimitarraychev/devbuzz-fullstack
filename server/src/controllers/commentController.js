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

		await commentService.add(commentData);

		const post = await postService.getOne(commentData._postId);

		res.status(201).json({
			ok: true,
			message: "Comment successfully added.",
			comments: post.comments,
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

router.delete("/:commentId", isAuth, async (req, res) => {
	try {
		const commentId = req.params.commentId;

		const comment = await commentService.getOne(commentId);

		if (comment.owner._id != req.user._id)
			throw new Error("Owner verification failed!");

		const comments = await commentService.delete(commentId);

		res.status(200).json({
			ok: true,
			message: "Comment successfully deleted.",
			comments,
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error.message,
		});
	}
});

module.exports = router;
