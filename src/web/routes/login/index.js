const express = require("express");

const { login, register } = require("../../controllers");

const LoginRouter = express.Router();

LoginRouter.post("/register", register);
LoginRouter.post("/login", login);

module.exports = LoginRouter;
