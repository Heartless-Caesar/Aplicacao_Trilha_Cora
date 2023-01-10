const { StatusCodes } = require("http-status-codes");

const require_user = (req, res, next) => {
  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ Message: "Invalid session" });
  }

  return next();
};

module.exports = { require_user };
