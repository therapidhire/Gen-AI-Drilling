const express = require("express");

const { holdings } = require("../../controllers");

const holdingsRouter = express.Router();

holdingsRouter.get("/holdings", holdings);

module.exports = holdingsRouter;
