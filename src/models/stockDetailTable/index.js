const mongoose = require("mongoose");

const stockDetailTableSchema = new mongoose.Schema({
  stock_Id: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

stockDetailTableSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const StockDetailTable = mongoose.model(
  "StockDetailTable",
  stockDetailTableSchema
);

module.exports = StockDetailTable;
