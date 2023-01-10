const jwt = require("jsonwebtoken");
require("dotenv").config();

const sign_jwt = (payload, expires) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expires,
  });
};

const verify_jwt = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
};

module.exports = { sign_jwt, verify_jwt };
