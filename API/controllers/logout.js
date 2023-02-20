const { User } = require("../models");
const { StatusCodes } = require("http-status-codes");

const handle_logout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refresh_token) {
    return res.status(StatusCodes.NO_CONTENT);
  }

  const refresh_token = cookies.refresh_token;

  const found_user = await User.findOne({
    where: { refresh_token: refresh_token },
  });

  if (!found_user) {
    res.clearCookie("refresh_token", { httpOnly: true });
    return res.status(StatusCodes.NO_CONTENT);
  }

  // * Delete refresh_token in DB
  await User.update({ refresh_token: "" }, { where: { id: found_user.id } });

  res.clearCookie("refresh_token", { httpOnly: true });

  res.status(StatusCodes.NO_CONTENT).json({ msg: "User logged out" });
};

module.exports = { handle_logout };
