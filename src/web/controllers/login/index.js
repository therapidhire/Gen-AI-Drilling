const UserDetails = require("../../../models/userDetails");
const bcrypt = require("bcrypt");
const { signToken } = require("../../../middlewares/jwt");

const login = async (req, res) => {
  try {
    const {
      email,
      password,
      // //   firstName,
      // //   lastName,
      // //   dob,
      // //   age,
      // //   phoneNo,
      //   roles = "Admin",
    } = req.body;

    // Basic Validation
    if (!email || !password) {
      return res.status(400).send({
        status: 400,
        message: "Email and password are required for login.",
      });
    }

    // Check if user exists
    const user = await UserDetails.findOne({ email });
    if (!user) {
      return res.status(404).send({
        status: 404,
        message: "User not found.",
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        status: 401,
        message: "Invalid credentials.",
      });
    }

    // Generate JWT Token
    const token = signToken({ id: user._id, roles: user.roles });

    return res.status(200).send({
      status: 200,
      message: "Login successful.",
      data: {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        token: token,
      },
    });
  } catch (error) {
    console.error("Error in login API:", error);

    return res.status(500).send({
      status: 500,
      message: "Internal Server Error.",
    });
  }
};

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dob,
      age,
      email,
      phoneNo,
      password,
      roles = "Admin",
    } = req.body;

    // Basic Validation
    if (
      !firstName ||
      !lastName ||
      !dob ||
      !age ||
      !email ||
      !phoneNo ||
      !password
    ) {
      return res.status(400).send({
        status: 400,
        message: "All required fields must be provided.",
      });
    }

    // Check if email and phoneNo already exist
    const existingUser = await UserDetails.findOne({
      $or: [{ email }, { phoneNo }],
    });

    if (existingUser) {
      return res.status(409).send({
        status: 409,
        message: "User with the provided email or phone number already exists.",
      });
    }

    // Create new user
    const newUser = new UserDetails({
      firstName,
      lastName,
      dob,
      age,
      email,
      phoneNo,
      password,
      roles,
    });

    await newUser.save();

    return res.status(201).send({
      status: 201,
      message: "User registered successfully.",
    });
  } catch (error) {
    console.error("Error in register API:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).send({
        status: 400,
        message: "Validation error occurred.",
        details: error.message,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "Internal Server Error.",
    });
  }
};

module.exports = { login, register };
