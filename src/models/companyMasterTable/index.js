const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const companyMasterSchema = new mongoose.Schema({
  company_Name: {
    type: String,
    required: true,
    unique: true,
  },
  seq_Number: {
    type: Number,
  },
});

companyMasterSchema.plugin(AutoIncrement, { inc_field: "seq_Number" });
const CompanyMasterTable = mongoose.model(
  "CompanyMasterTable",
  companyMasterSchema
);

module.exports = CompanyMasterTable;
