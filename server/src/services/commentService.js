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
	return comment;
};

// exports.update = (postId, postData) =>
// 	Post.findByIdAndUpdate(postId, postData, {
// 		runValidators: true,
// 		new: true,
// 	});

// exports.delete = (postId) => Post.findByIdAndDelete(postId);
