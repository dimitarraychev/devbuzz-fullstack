const User = require("../models/User");
const Post = require("../models/Post");

exports.getTop = () =>
	User.find({}, { password: 0, __v: 0 }).sort({ posts: 1 }).limit(3).lean();

exports.getOne = async (userId, limit, skip) => {
	const totalPosts = await Post.countDocuments({ user: userId });

	const user = await User.findById({ _id: userId }, { password: 0, __v: 0 })
		.populate({
			path: "posts",
			options: { sort: { createdAt: -1 }, limit, skip },
		})
		.lean();

	return { user, totalPosts };
};
