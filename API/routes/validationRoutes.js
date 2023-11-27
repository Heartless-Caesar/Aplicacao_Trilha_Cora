const {
  validateLocal,
  fetchAllLocals,
  fetchSingleCertificate,
} = require("../controllers/validation_controller");

const validationRouter = require("express").Router();

validationRouter.route("/update").patch(validateLocal);

validationRouter.route("/fetch").get(fetchAllLocals);

validationRouter.route("/fetch/:certificateId").get(fetchSingleCertificate);

module.exports = { validationRouter };
