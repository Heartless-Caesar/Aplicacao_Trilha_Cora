const express = require("express");
const refresh_router = express.Router();
const {
  handle_refresh_token,
} = require("../controllers/refresh_token_controller");

refresh_router.route(`/Refresh`).get(handle_refresh_token);

module.exports = { refresh_router };
