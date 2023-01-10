const { StatusCodes } = require("http-status-codes");
const { create_session, get_session } = require("../utils/session_utils");
const { verify_jwt, sign_jwt } = require("../utils/jwt_utils");

const deserialize_user = async (req, res, next) => {
  const { access_token, refresh_token } = req.cookies;

  if (!access_token) {
    return next();
  }

  const { payload, expired } = verify_jwt(access_token);

  // For valid access token
  if (payload) {
    req.user = payload;

    return next();
  }

  //For invalid access token
  const { payload: refresh } =
    expired && refresh_token ? verify_jwt(refresh_token) : { payload: null };

  if (!refresh) {
    return next();
  }

  const session = await get_session(refresh.id);

  if (!session) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ Message: "Invalid session" });
  }

  //Add session
  const new_access_token = sign_jwt(session, "5s");

  res.cookie("access_token", new_access_token, {
    maxAge: 300000,
    httpOnly: true,
  });

  req.user = verify_jwt(new_access_token).payload;

  return next();
};

module.exports = { deserialize_user };
