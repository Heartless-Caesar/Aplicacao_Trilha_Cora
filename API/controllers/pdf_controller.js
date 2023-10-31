const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");
const { options } = require("../config/pdf_options");
const partial = fs.readFileSync(path.join(__dirname, "../assets/partial_cert.html"), "utf8");
const complete = fs.readFileSync(path.join(__dirname, "../assets/complete_cert.html"), "utf8");
const { User } = require("../models");

const generate_trial_cert = async (req, res) => {
  const { inicio, destino, userId } = req.query;

  let document = {};

  const user = await User.findOne({ where: { id: userId } });

  if (
    (inicio !== "Cidade de Goiás" && destino !== "Corumba") ||
    (inicio !== "Corumba" && destino !== "Cidade de Goiás")
  ) {
    document = {
      template: partial,
      data: {
        name: req.user.name,
        inicio: inicio,
        destino: destino,
      },
      path: "output",
    };
  } else {
    document = {
      template: complete,
      data: {
        name: user.username,
      },
      path: null,
    };
  }

  const pdfTemplate = {
    html: document.template,
    data: document.data,
  };

  const pdfOptions = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
  };

  const pdfFile = pdf.create(pdfTemplate, pdfOptions);

  if (document.path) {
    const outputFile = path.join(__dirname, document.path, "certificado.pdf");
    pdfFile.toFile(outputFile, (error, res) => {
      if (error) {
        console.log("Algo de errado ocorreu ao tentar gerar o arquivo PDF");
        console.log(`Output error ${error}`);
      } else {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=certificado.pdf");
        res.sendFile(outputFile);
      }
    });
  } else {
    pdfFile.toStream((error, stream) => {
      if (error) {
        console.log("Algo de errado ocorreu ao tentar gerar o arquivo PDF");
        console.log(`Output error ${error}`);
      } else {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=certificado.pdf");
        stream.pipe(res);
      }
    });
  }
};

module.exports = { generate_trial_cert };
