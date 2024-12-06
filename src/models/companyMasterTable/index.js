const mongoose = require("mongoose");

const companyMasterSchema = new mongoose.Schema({
  stock_Name: {
    type: String,
    required: true,
    unique: true,
  },
  squence_Number: {
    type: Number,
    required: true,
  },
});

const CompanyMasterTable = mongoose.model(
  "CompanyMasterTable",
  companyMasterSchema
);

module.exports = CompanyMasterTable;
