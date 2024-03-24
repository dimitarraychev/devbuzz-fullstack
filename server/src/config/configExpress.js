const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { auth } = require("../middlewares/auth");

function configExpress(app) {
	app.use(express.json());
	app.use(cookieParser());
	app.use(cors(process.env.CORS));
	app.use(auth);

	return app;
}

module.exports = configExpress;
