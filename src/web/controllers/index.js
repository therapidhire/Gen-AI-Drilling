const { login, register } = require("./login");
const holdings = require("./holdings");
const position = require("./position");
const { addStock, companyMasterData } = require("./masterApi");
const {
  getAllTransaction,
  getTransactionById,
  postBuy,
  postSale,
} = require("./transection");
const {
  addStockDetails,
  getAllStockDetails,
  getStockDetailsByUserId,
  updateStockDetails,
  deleteStockDetails,
} = require("./stock");

module.exports = {
  login,
  register,

  holdings,
  position,

  getAllTransaction,
  getTransactionById,
  postBuy,
  postSale,

  addStock,
  companyMasterData,

  addStockDetails,
  getAllStockDetails,
  getStockDetailsByUserId,
  updateStockDetails,
  deleteStockDetails,
};
