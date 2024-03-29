const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.add = async (commentData) => {
	const existingPost = await Post.findById(commentData._postId);
	if (!existingPost)
		throw new Error("Post with this _postId does not exist!");

	const comment = await Comment.create(commentData);

	const post = await Post.findByIdAndUpdate(
		comment._postId,
		{ $addToSet: { comments: comment._id } },
		{ new: true }
	).populate("comments");

	return post;
};

exports.getOne = (commentId) => Comment.findById(commentId);

exports.delete = async (commentId, userId) => {
	const comment = await Comment.findOneAndDelete({
		_id: commentId,
		"owner._id": userId,
	});
	const post = await Post.findById(comment._postId).populate("comments");

	post.comments = post.comments.filter((c) => c.id != commentId);
	await post.save();

	const postObj = post.toObject();

	return postObj;
};
