const express = require("express");

const {
  addStockDetails,
  getStockDetails,
  updateStockDetails,
  deleteStockDetails,
} = require("../../controllers");

const stockRouter = express.Router();

stockRouter.get("/addStockDetails", addStockDetails);
stockRouter.get("/getStock", getStockDetails);
stockRouter.get("/updateStock", updateStockDetails);
stockRouter.get("/deleteStock", deleteStockDetails);

module.exports = stockRouter;
