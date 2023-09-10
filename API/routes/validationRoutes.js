const {
  validateLocal,
  fetchAllLocals,
} = require("../controllers/validation_controller");

const validationRouter = require("express").Router();

validationRouter.route("/update").patch(validateLocal);

validationRouter.route("/fetch").get(fetchAllLocals);

module.exports = { validationRouter };
