const { User } = require("../models");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const handle_refresh_token = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refresh_token) {
    return res.status(StatusCodes.UNAUTHORIZED);
  }

  const refresh_token = cookies.refresh_token;

  const found_user = await User.findOne({
    where: { refresh_token: refresh_token },
  });

  jwt.verify(refresh_token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || found_user.username != decoded.username) {
      return res.status(StatusCodes.FORBIDDEN);
    }
    const access_token = jwt.sign(
      {
        username: decoded.username,
        id: decoded.id,
        email: decoded.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1800s" }
    );

    res.json({ access_token });
  });
};

module.exports = { handle_refresh_token };
