const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");
const { options } = require("../config/pdf_options");
const partial = fs.readFileSync(
  path.join(`${__dirname}/../assets/partial_cert.html`),
  "utf8"
);
const complete = fs.readFileSync(
  path.join(`${__dirname}/../assets/complete_cert.html`),
  "utf8"
);
const { User } = require("../models");

const generate_trial_cert = async (req, res) => {
  const { inicio, destino, userId } = req.query;
  let document = {};

  const user = await User.findOne({ where: { id: userId } });

  if (inicio != "Cidade de Goiás" && destino != "Corumbá de Goiás") {
    document = {
      html: partial,
      data: {
        nome: user.username,
        origem: inicio,
        destino: destino,
      },
      path: "../output/certificado.pdf",
      type: "Buffer",
    };
  } else {
    document = {
      html: complete,
      data: {
        name: user.username,
      },
      path: "../output/certificado.pdf",
      type: "Buffer",
    };
  }

  return pdf
    .create(document, options)
    .then(async (result) => {
      // Assuming result is an array
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=certificado.pdf"
      );
      res.send(result);
    })
    .catch(async (error) => {
      console.log("Algo de errado ocorreu ao tentar gerar o arquivo PDF");
      console.log(`Output error ${error}`);
    });
};

module.exports = { generate_trial_cert };
