const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { auth } = require("../middlewares/auth");

const corsOptions = {
	origin: "http://localhost:4200",
	credentials: true,
};

function configExpress(app) {
	app.use(express.json());
	app.use(cookieParser());
	app.use(cors(corsOptions));
	app.use(auth);

	return app;
}

module.exports = configExpress;
