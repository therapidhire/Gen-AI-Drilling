const { login, register } = require("./login");
const holdings = require("./holdings");
const position = require("./position");
const {
  getAllTransaction,
  getTransactionById,
  postBuy,
  postSale,
} = require("./transection");

module.exports = {
  login,
  register,

  holdings,
  position,

  getAllTransaction,
  getTransactionById,
  postBuy,
  postSale,
};
