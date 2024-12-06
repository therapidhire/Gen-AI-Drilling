const express = require("express");

const { position } = require("../../controllers");

const positionRouter = express.Router();

positionRouter.get("/getAll_position", position);

module.exports = positionRouter;
