const User = require("../models/User");
const Post = require("../models/Post");

exports.getTop = () =>
	User.aggregate([
		{
			$addFields: {
				postsCount: { $size: "$posts" },
			},
		},
		{
			$sort: { postsCount: -1 },
		},
		{
			$limit: 3,
		},
		{
			$project: {
				password: 0,
				__v: 0,
			},
		},
	]);

exports.getOne = async (userId, limit, skip) => {
	const totalPosts = await Post.countDocuments({ "owner._id": userId });

	const user = await User.findById({ _id: userId }, { password: 0, __v: 0 })
		.populate({
			path: "posts",
			options: { sort: { createdAt: -1 }, limit, skip },
		})
		.lean();

	return { user, totalPosts };
};
