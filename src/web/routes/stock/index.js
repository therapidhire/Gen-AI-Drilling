const express = require("express");

const {
  addStockDetails,
  getAllStockDetails,
  getStockDetailsByUserId,
  updateStockDetails,
  deleteStockDetails,
} = require("../../controllers");

const stockRouter = express.Router();

stockRouter.get("/addStockDetails", addStockDetails);
stockRouter.get("/getStock", getAllStockDetails);
stockRouter.get("/getStockById", getStockDetailsByUserId);
stockRouter.put("/updateStock", updateStockDetails);
stockRouter.delete("/deleteStock", deleteStockDetails);

module.exports = stockRouter;
