const {
  register_codes,
  update_codes,
} = require("../controllers/local_codes_controller");

const code_router = require("express").Router();

code_router.route("/register_code").post(register_codes);

code_router.route("/update_code").patch(update_codes);

module.exports = { code_router };
