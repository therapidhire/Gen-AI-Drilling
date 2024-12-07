const express = require("express");

const { addStock, companyMasterData } = require("../../controllers");

const addStockRouter = express.Router();

addStockRouter.post("/addStock", addStock);
addStockRouter.post("/addCompany", companyMasterData);

module.exports = addStockRouter;
