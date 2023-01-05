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
  const { name, start_local, start_time, finish_local, finish_time, type } =
    req.query;
  const document = {};

  if (type == "partial") {
    document = {
      html: partial,
      data: {
        name: name,
        start_local: start_local,
        finish_local: finish_local,
        start_time: start_time,
        finish_time: finish_time,
      },
      path: "../output",
      type: "Stream",
    };
  } else {
    document = {
      html: complete,
      data: {
        name: name,
        start_local: start_local,
        finish_local: finish_local,
        start_time: start_time,
        finish_time: finish_time,
      },
      path: `../output_files/${name}_certificate.pdf`,
      type: "Stream",
    };
  }

  return pdf
    .create(document, options)
    .then(async (res) => {
      console.log("Criação de PDF sucedida");
      // * Envio de email para medico
      // * Parametros: Diretorio & Nome do arquivo
      //TODO: Adicionar parametro para email do usuario correspondente ao codigo
      await enviarEmail(`../output_files/`, `${name}_certificate.pdf`);
      console.log(res);
    })
    .catch(async (error) => {
      console.log("Algo de errado ocorreu ao tentar gerar o arquivo PDF");
      console.log(`Output error ${error}`);
    });
};

module.exports = { generate_trial_cert };
