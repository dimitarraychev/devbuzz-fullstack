const router = require("express").Router();
const { isAuth } = require("../middlewares/auth");
const postService = require("../services/postService");

const validationRegex = new RegExp(/:\s([A-Z][\w\s]+!)/);

router.get("/", async (req, res) => {
	try {
		const category = req.query.category || "all";
		const search = req.query.search || "";
		const limit = parseInt(req.query.limit) || 6;
		const page = parseInt(req.query.page) || 1;
		const skip = (page - 1) * limit;

		const { posts, totalPosts } = await postService.getLatest(
			search,
			category,
			limit,
			skip
		);

		const totalPages = Math.ceil(totalPosts / limit) || 1;

		res.status(200).json({
			posts,
			category,
			search,
			page,
			totalPages,
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

router.get("/hottest", async (req, res) => {
	try {
		const category = req.query.category || "all";

		const posts = await postService.getHottest(category);

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
		const userId = req.user._id;

		const post = await postService.update(postId, postData, userId);

		res.status(200).json(post);
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
		const userId = req.user._id;

		const post = await postService.delete(postId, userId);

		res.status(200).json(post);
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

		const post = await postService.like(postId, userId);

		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error.message,
		});
	}
});

router.post("/:postId/unlike", isAuth, async (req, res) => {
	try {
		const postId = req.params.postId;
		const userId = req.user._id;

		const post = await postService.unlike(postId, userId);

		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: error.message,
		});
	}
});

module.exports = router;
