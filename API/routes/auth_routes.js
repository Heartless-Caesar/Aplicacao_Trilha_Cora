const express = require("express");
const auth_router = express.Router();
const { base_url } = require("../utils/baseUrl");
const {
  register_user,
  login_user,
} = require("../controllers/auth_controllers");

auth_router.route(`${base_url}/Register`).post(register_user);

auth_router.route(`${base_url}/Login`).post(login_user);

module.exports = { auth_router };