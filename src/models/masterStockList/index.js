const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const StockListSchema = new mongoose.Schema({
  StockName: {
    type: String,
    required: true,
    unique: true,
  },
  SeqNum: {
    type: Number,
    unique: true,
  },
});

StockListSchema.plugin(AutoIncrement, { inc_field: "SeqNum" });
const StockList = mongoose.model("StockList", StockListSchema);

module.exports = StockList;
