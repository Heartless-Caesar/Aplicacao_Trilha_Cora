const { verify_jwt } = require("../utils/jwt_utils");

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

  //Add session

  return next();
};

module.exports = { deserialize_user };
