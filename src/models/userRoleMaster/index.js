const mongoose = require("mongoose");

const userRoleMasterSchema = new mongoose.Schema({
  roleId: {
    type: Number,
    required: true,
    unique: true,
  },
  roleDescription: {
    type: String,
    required: true,
    maxlength: 255,
  },
  seqNumber: {
    type: Number,
    required: true,
    unique: true,
  },
});
const UserRoleMaster = mongoose.model("UserRoles", userRoleMasterSchema);

module.exports = UserRoleMaster;
