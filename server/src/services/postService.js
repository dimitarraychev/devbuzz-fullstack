const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

exports.create = async (postData) => {
	const post = await Post.create(postData);
	await User.findByIdAndUpdate(postData.owner._id, {
		$addToSet: { posts: post._id },
	});
	return post;
};

exports.getOne = (postId) =>
	Post.findById(postId).populate({
		path: "comments",
		options: { sort: { createdAt: -1 } },
	});

exports.getLatest = async (search, category, limit, skip) => {
	let query = {};

	if (category !== "all") {
		query.category = category;
	}

	if (search !== "") {
		query.title = new RegExp(search, "i");
	}

	const totalPosts = await Post.countDocuments(query);
	const posts = await Post.find(query)
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit);
	return { posts, totalPosts };
};

exports.getHottest = async (category) => {
	let query = {};

	if (category !== "all") {
		query.category = category;
	}

	const posts = Post.find(query).sort({ likes: -1 }).limit(3);

	return posts;
};

exports.like = (postId, userId) =>
	Post.findByIdAndUpdate(
		postId,
		{ $addToSet: { likes: userId } },
		{ new: true }
	);

exports.update = (postId, postData) =>
	Post.findByIdAndUpdate(postId, postData, {
		runValidators: true,
		new: true,
	});

exports.delete = async (postId) => {
	const post = await Post.findByIdAndDelete(postId);
	const user = await User.findById(post.owner._id);

	await Comment.deleteMany({ _postId: post._id });

	user.posts = user.posts.filter((id) => id != postId);
	await user.save();

	return post;
};
