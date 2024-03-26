const User = require("../models/User");

exports.getTop = () =>
	User.find({}, { password: 0, __v: 0 }).sort({ posts: 1 }).limit(3).lean();

exports.getOne = async (userId, limit, skip) => {
	const user = await User.findById({ _id: userId }, { password: 0, __v: 0 })
		.populate({
			path: "posts",
			options: { sort: { createdAt: -1 }, limit, skip },
		})
		.lean();

	const totalPosts = user.posts.length | 0;

	return { user, totalPosts };
};
