const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const stockListSchema = new mongoose.Schema({
  stockName: {
    type: String,
    required: true,
    unique: true,
  },
  symbol: {
    type: String,
    require: true,
    unique: true,
  },
  isin_Num: {
    type: String,
    require: true,
    unique: true,
  },
  // company_id: {
  //   type: Number,
  //   require: true,
  // },
});

// StockListSchema.plugin(AutoIncrement, { inc_field: "SeqNum" });
const StockList = mongoose.model("StockList", stockListSchema);

module.exports = StockList;
