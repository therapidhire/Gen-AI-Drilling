const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userDetailsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  dob: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  phoneNo: {
    type: Number,
    required: true,
    unique: true,
    match: /^\+?[1-9]\d{1,14}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Enforce a minimum password length
  },
  //   roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserRoles" }],
  roles: {
    type: String,
    enum: ["Super Admin", "Admin", "Supervisor", "User"],
    default: "User",
    ref: "UserRoles",
  },
  //   createdBy: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     required: true,
  //   },
  //   updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userDetailsSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  this.updatedAt = Date.now();
  next();
});

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

module.exports = UserDetails;
