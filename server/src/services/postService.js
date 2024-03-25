const Post = require("../models/Post");
const User = require("../models/User");

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

exports.getLatest = async (category, limit, skip) => {
	let query = {};

	if (category !== "all") {
		query.category = category;
	}

	const totalPosts = await Post.countDocuments(query);
	const posts = await Post.find(query)
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit);
	return { posts, totalPosts };
};

exports.getHottest = () => Post.find().sort({ likes: -1 }).limit(3);

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

exports.delete = (postId) => Post.findByIdAndDelete(postId);

// exports.search = (name) => Post.find({ name: new RegExp(name, "i") });
