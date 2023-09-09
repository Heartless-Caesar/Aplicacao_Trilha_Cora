const { validateLocal } = require("../controllers/validation_controller");

const validationRouter = require("express").Router();

validationRouter.route("/fetch").get(validateLocal);

module.exports = { validationRouter };
