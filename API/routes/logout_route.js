const express = require("express");
const logout_router = express.Router();
const { handle_logout } = require("../controllers/logout");

logout_router.route(`/Logout`).get(handle_logout);

module.exports = { logout_router };
