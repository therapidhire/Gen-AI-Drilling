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

stockDetailTableSchema.set("toObject", { virtuals: true });
stockDetailTableSchema.set("toJSON", { virtuals: true });

// Virtual Reference to StockList
stockDetailTableSchema.virtual("stockListData", {
  ref: "StockList", // Model to reference
  localField: "stock_Id", // Field in StockDetailTable
  foreignField: "isin_Num", // Field in StockList
  justOne: true, // Returns a single document instead of an array
});

const StockDetailTable = mongoose.model(
  "StockDetailTable",
  stockDetailTableSchema
);

module.exports = StockDetailTable;
