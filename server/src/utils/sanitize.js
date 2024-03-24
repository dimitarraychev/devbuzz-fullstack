exports.sanitizeUserObject = (user) => {
	const { password, __v, ...userData } = user;
	return userData;
};
