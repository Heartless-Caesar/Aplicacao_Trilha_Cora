const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
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
      type: "",
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
      type: "",
    };
  }

  pdf
    .create(document, {
      childProcessOptions: {
        format: "A4",
        orientation: "landscape",
        border: "10mm",
        header: {
          height: "10mm",
          contents:
            '<div style="text-align: center;">Certificado Trilha de Cora Coralina</div>',
        },
        footer: {
          height: "10mm",
          contents: {
            first: "Cover page",
            2: "Second page", // Any page number is working. 1-based index
            default:
              '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: "Last Page",
          },
        },
        timeout: 10000,
        env: {
          OPENSSL_CONF: "/dev/null",
        },
      },
    })
    .then(async (res) => {
      console.log("Criação de PDF sucedida");
      console.log(res);
    })
    .catch(async (error) => {
      console.log("Algo de errado ocorreu ao tentar gerar o arquivo PDF");
      console.log(`Output error ${error}`);
    });

  res
    .status(StatusCodes.OK)
    .download(
      `../output_files/${req.user.name}_certificate.pdf`,
      `${req.user.name}_certificate.pdf`
    );
};

module.exports = { generate_trial_cert };
