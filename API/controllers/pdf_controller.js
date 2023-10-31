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
const { User } = require("../models");

const generate_trial_cert = async (req, res) => {
  const { inicio, destino, userId } = req.query;
  const document = {};

  const user = await User.findOne({ where: { id: userId } });

  if (type == "partial") {
    document = {
      html: partial,
      data: {
        name: req.user.name,
        inicio: inicio,
        destino: destino,
      },
      path: "../output",
      type: "Stream",
    };
  } else {
    document = {
      html: complete,
      data: {
        name: user.username,
      },
      path: null,
      type: "Stream",
    };
  }

  return pdf
    .create(document, options)
    .then((result) => {
      const pdfBuffer = result[0].content;

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=certificado.pdf"
      );
      res.send(pdfBuffer);
    })
    .catch(async (error) => {
      console.log("Algo de errado ocorreu ao tentar gerar o arquivo PDF");
      console.log(`Output error ${error}`);
    });
};

module.exports = { generate_trial_cert };
