const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const signToken = (payload, options = {}) => {
  try {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      ...options,
    });
  } catch (error) {
    throw new Error(`Error signing token: ${error.message}`);
  }
};

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ error: "Unauthorized user" });
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Permission denied" });
    }
    next();
  };
};

module.exports = { signToken, authMiddleware, roleMiddleware };
