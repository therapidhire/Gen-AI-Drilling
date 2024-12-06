const express = require("express");

const { addStock } = require("../../controllers");

const addStockRouter = express.Router();

addStockRouter.post("/addStock", addStock);

module.exports = addStockRouter;
