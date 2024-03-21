const router = require("express").Router();
const { isAuth } = require("../middlewares/auth");
const commentService = require("../services/commentService");

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

		const comments = await commentService.add(commentData);

		res.status(201).json({
			ok: true,
			message: "Comment successfully added.",
			comments,
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

// router.patch("/:postId", isAuth, async (req, res) => {
// 	try {
// 		const postId = req.params.postId;
// 		const postData = req.body;

// 		const post = await postService.getOne(postId);
// 		if (post.owner._id != req.user._id)
// 			throw new Error("Owner verification failed!");

// 		await postService.update(postId, postData);

// 		res.status(200).json({
// 			ok: true,
// 			message: "Post successfully edited",
// 			_id: postId,
// 		});
// 	} catch (error) {
// 		error.message =
// 			error.message.match(validationRegex)?.[1] ?? error.message;

// 		res.status(400).json({
// 			ok: false,
// 			message: error.message,
// 		});
// 	}
// });

// router.delete("/:postId", isAuth, async (req, res) => {
// 	try {
// 		const postId = req.params.postId;

// 		const post = await postService.getOne(postId);
// 		if (post.owner._id != req.user._id)
// 			throw new Error("Owner verification failed!");

// 		await postService.delete(postId);

// 		res.status(200).json({
// 			ok: true,
// 			message: "Post successfully deleted",
// 		});
// 	} catch (error) {
// 		res.status(400).json({
// 			ok: false,
// 			message: error.message,
// 		});
// 	}
// });

module.exports = router;
