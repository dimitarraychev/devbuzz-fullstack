const Post = require("../models/Post");

exports.create = (postData) => Post.create(postData);

// exports.getAll = () => Post.find();

exports.getOne = (postId) => Post.findById(postId);

exports.getLatest = () => Post.find().sort({ createdAt: -1 }).limit(6);

exports.getHottest = () => Post.find().sort({ likes: -1 }).limit(3);

exports.like = (postId, userId) =>
	Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } });

exports.update = (postId, postData) =>
	Post.findByIdAndUpdate(postId, postData, { runValidators: true });

exports.delete = (postId) => Post.findByIdAndDelete(postId);

// exports.search = (name) => Post.find({ name: new RegExp(name, "i") });
