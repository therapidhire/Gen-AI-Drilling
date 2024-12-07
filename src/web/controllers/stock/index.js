const addStockDetails = require("./addStockDetails");
const {
  getAllStockDetails,
  getStockDetailsByUserId,
} = require("./getStockDetails");
const updateStockDetails = require("./updateStockDetails");
const deleteStockDetails = require("./deleteStockDetails");

module.exports = {
  addStockDetails,
  getAllStockDetails,
  getStockDetailsByUserId,
  updateStockDetails,
  deleteStockDetails,
};
