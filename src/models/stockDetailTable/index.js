const mongoose = require("mongoose");

const stockDetailTableSchema = new mongoose.Schema({
  Stock_id: {
    type: Number,
    required: true,
    ref: "CompanyMasterTable",
  },
  price: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserDetails",
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserDetails",
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
