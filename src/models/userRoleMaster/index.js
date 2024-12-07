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
  user_id: {
    type: String,
    require: true,
    unique: true,
  },
});
const UserRoleMaster = mongoose.model("UserRoles", userRoleMasterSchema);

module.exports = UserRoleMaster;
