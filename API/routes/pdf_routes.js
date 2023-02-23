const { pdf_test } = require("../pdf-test");
const pdf_test_router = require("express").Router();

pdf_test_router.route("/pdf_cert").get(pdf_test);

module.exports = { pdf_test_router };
