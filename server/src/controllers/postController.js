const router = require("express").Router();
const { isAuth } = require("../middlewares/auth");
const postService = require("../services/postService");

router.get("/", async (req, res) => {
	try {
		const posts = await postService.getLatest();

		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error?.message,
		});
	}
});

router.post("/", isAuth, async (req, res) => {
	try {
		const { username, _id } = req.user;

		const postData = {
			...req.body,
			owner: {
				_id,
				username,
			},
			likes: [],
			comments: [],
		};

		const post = await postService.create(postData);

		res.status(200).json({
			ok: true,
			message: "Successfully created",
			postId: post._id,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error?.message,
		});
	}
});

router.get("/hottest", async (req, res) => {
	try {
		const posts = await postService.getHottest();

		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error?.message,
		});
	}
});

router.get("/:postId", async (req, res) => {
	try {
		const postId = req.params.postId;
		const post = await postService.getOne(postId);

		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error?.message,
		});
	}
});

router.patch("/:postId", isAuth, async (req, res) => {
	try {
		const postId = req.params.postId;
		const postData = req.body;

		// TODO check if owner

		await postService.update(postId, postData);

		res.status(200).json({
			ok: true,
			message: "Post successfully edited",
			postId,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error?.message,
		});
	}
});

router.delete("/:postId", isAuth, async (req, res) => {
	try {
		const postId = req.params.postId;

		// TODO check if owner

		await postService.delete(postId);

		res.status(200).json({
			ok: true,
			message: "Post successfully deleted",
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error?.message,
		});
	}
});

router.post("/:postId/like", isAuth, async (req, res) => {
	try {
		const postId = req.params.postId;
		const userId = req.user._id;

		// TODO check if owner

		const post = await postService.like(postId, userId);

		res.status(200).json({
			ok: true,
			message: "Post successfully liked",
			likes: post.likes.length,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error?.message,
		});
	}
});

module.exports = router;
