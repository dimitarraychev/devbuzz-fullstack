const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.add = async (commentData) => {
	const existingPost = await Post.findById(commentData._postId);
	if (!existingPost)
		throw new Error("Post with this _postId does not exist!");

	const comment = await Comment.create(commentData);

	await Post.findByIdAndUpdate(comment._postId, {
		$addToSet: { comments: comment._id },
	});

	return comment._id;
};

exports.getOne = (commentId) => Comment.findById(commentId);

exports.delete = async (commentId) => {
	const comment = await Comment.findByIdAndDelete(commentId);
	const post = await Post.findById(comment._postId).populate("comments");

	post.comments = post.comments.filter((c) => c.id != commentId);
	await post.save();

	const postObj = post.toObject();

	return postObj.comments;
};
