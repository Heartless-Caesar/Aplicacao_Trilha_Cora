const { generate_trial_cert } = require("../controllers/pdf_controller");
const pdf_router = require("express").Router();

pdf_router.route("/pdf_cert").get(generate_trial_cert);

module.exports = { pdf_router };
