const express = require("express");

const {
  getAllTransaction,
  getTransactionById,
  postBuy,
  postSale,
} = require("../../controllers");

const transactionRouter = express.Router();

transactionRouter.get("/getAllTransaction", getAllTransaction);
transactionRouter.get("/getTransactionById", getTransactionById);
transactionRouter.get("/postBuy", postBuy);
transactionRouter.get("/postSale", postSale);

module.exports = transactionRouter;
