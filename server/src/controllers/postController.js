const router = require("express").Router();
const { isAuth } = require("../middlewares/auth");
const postService = require("../services/postService");

const validationRegex = new RegExp(/:\s([A-Z][\w\s]+!)/);

router.get("/", async (req, res) => {
	try {
		const limit = parseInt(req.query.limit) || 6;
		const page = parseInt(req.query.page) || 1;
		const skip = (page - 1) * limit;

		const { posts, totalPosts } = await postService.getLatest(limit, skip);

		res.status(200).json({
			posts,
			currentPage: page,
			totalPages: Math.ceil(totalPosts / limit),
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error.message,
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

		res.status(201).json({
			ok: true,
			message: "Post successfully created.",
			_id: post._id,
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

router.get("/hottest", async (req, res) => {
	try {
		const posts = await postService.getHottest();

		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error.message,
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
			message: error.message,
		});
	}
});

router.patch("/:postId", isAuth, async (req, res) => {
	try {
		const postId = req.params.postId;
		const postData = req.body;

		const post = await postService.getOne(postId);
		if (post.owner._id != req.user._id)
			throw new Error("Owner verification failed!");

		await postService.update(postId, postData);

		res.status(200).json({
			ok: true,
			message: "Post successfully edited",
			_id: postId,
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

router.delete("/:postId", isAuth, async (req, res) => {
	try {
		const postId = req.params.postId;

		const post = await postService.getOne(postId);
		if (post.owner._id != req.user._id)
			throw new Error("Owner verification failed!");

		await postService.delete(postId);

		res.status(200).json({
			ok: true,
			message: "Post successfully deleted",
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error.message,
		});
	}
});

router.post("/:postId/like", isAuth, async (req, res) => {
	try {
		const postId = req.params.postId;
		const userId = req.user._id;

		const postBeforeUpdate = await postService.getOne(postId);
		if (postBeforeUpdate.owner._id == req.user._id)
			throw new Error("Cannot like own post!");

		const post = await postService.like(postId, userId);

		res.status(200).json({
			ok: true,
			message: "Post successfully liked",
			likes: post.likes.length,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error.message,
		});
	}
});

module.exports = router;
