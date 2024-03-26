const User = require("../models/User");

exports.getTop = () =>
	User.find({}, { password: 0, __v: 0 }).sort({ posts: 1 }).limit(3).lean();

exports.getOne = (userId) =>
	User.findById({ _id: userId }, { password: 0, __v: 0 }).lean();
