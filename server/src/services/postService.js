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
		.limit(limit)
		.select("_id title image likes createdAt");
	return { posts, totalPosts };
};

exports.getHottest = async (category) => {
	let pipeline = [
		{
			$addFields: {
				likesCount: { $size: "$likes" },
			},
		},
		{
			$sort: { likesCount: -1 },
		},
		{
			$limit: 3,
		},
		{
			$project: {
				_id: 1,
				title: 1,
				image: 1,
				likes: 1,
				createdAt: 1,
			},
		},
	];

	if (category && category !== "all") {
		pipeline.unshift({ $match: { category: category } });
	}

	const posts = await Post.aggregate(pipeline);

	return posts;
};

exports.like = async (postId, userId) =>
	Post.findByIdAndUpdate(
		{ _id: postId, "owner._id": { $ne: userId } },
		{ $addToSet: { likes: userId } },
		{ new: true }
	);

exports.unlike = (postId, userId) =>
	Post.findByIdAndUpdate(
		{ _id: postId, "owner._id": { $ne: userId } },
		{ $pull: { likes: userId } },
		{ new: true }
	);

exports.update = async (postId, postData, userId) => {
	const updatedPost = await Post.findOneAndUpdate(
		{ _id: postId, "owner._id": userId },
		postData,
		{ runValidators: true, new: true }
	);

	if (!updatedPost)
		throw new Error("Post not found or owner verification failed!");

	return updatedPost;
};

exports.delete = async (postId, userId) => {
	const deletedPost = await Post.findOneAndDelete({
		_id: postId,
		"owner._id": userId,
	});

	if (!deletedPost)
		throw new Error("Post not found or owner verification failed!");

	await Comment.deleteMany({ _postId: postId });

	await User.updateOne({ _id: userId }, { $pull: { posts: postId } });

	return deletedPost;
};
