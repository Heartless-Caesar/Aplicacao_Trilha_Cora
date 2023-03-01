const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");
const { options } = require("../config/pdf_options");
const partial = fs.readFileSync(
  path.join(`${__dirname}/../assets/partial_cert.html`)
);
const complete = fs.readFileSync(
  path.join(`${__dirname}/../assets/complete_cert.html`)
);

const generate_trial_cert = async (req, res) => {
  const {
    start_local,
    start_time,
    finish_local,
    finish_time,
    start_date,
    finish_date,
    type,
  } = req.query;
  let document = {};

  if (type == "partial") {
    document = {
      html: partial,
      data: {
        name: req.user.name,
        start_local: start_local,
        finish_local: finish_local,
        start_time: start_time,
        finish_time: finish_time,
        start_date: start_date,
        finish_date: finish_date,
      },
      path: `../output_files/${req.user.name}_certificate.pdf`,
      type: "Stream",
    };
  } else {
    document = {
      html: complete,
      data: {
        name: req.user.name,
        start_local: start_local,
        finish_local: finish_local,
        start_time: start_time,
        finish_time: finish_time,
        start_date: start_date,
        finish_date: finish_date,
      },
      path: `../output_files/${req.user.name}_certificate.pdf`,
      type: "Stream",
    };
  }

  pdf
    .create(document, options)
    .then(async (res) => {
      console.log("Criação de PDF sucedida");
      console.log(res);
    })
    .catch(async (error) => {
      console.log("Algo de errado ocorreu ao tentar gerar o arquivo PDF");
      console.log(`Output error ${error}`);
    });

  res.download(`../output_files/${req.user.name}_certificate.pdf`);
};

module.exports = { generate_trial_cert };
