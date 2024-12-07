const LoginRouter = require("./login");
const holdingsRouter = require("./holdings");
const positionRouter = require("./position");
const transactionRouter = require("./transection");
const addStockRouter = require("./masterApi");
const stockRouter = require("./stock");

module.exports = {
  LoginRouter,
  holdingsRouter,
  positionRouter,
  transactionRouter,
  addStockRouter,
  stockRouter,
};
