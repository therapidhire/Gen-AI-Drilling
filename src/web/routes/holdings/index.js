const express = require("express");

const { holdings } = require("../../controllers");

const holdingsRouter = express.Router();

holdingsRouter.get("/getAll", holdings);

module.exports = holdingsRouter;
