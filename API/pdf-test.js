const fs = require("fs");
const path = require("path");
const complete = fs.readFileSync(
  path.join(`assets/complete_cert.html`),
  "utf8"
);
const partial = fs.readFileSync(path.join(`assets/partial_cert.html`), "utf8");
const { options } = require("./config/pdf_options");
const pdf = require("pdf-creator-node");

const pdf_test = async () => {
  const start_local = "Cidade de Goias";
  const start_time = "13:00";
  const finish_local = "Corumba de Goias";
  const finish_time = "19:00";
  const type = "partial";
  const name = "Cesa";
  let document = {};

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
      path: `./output_files/${name}.pdf`,
      type: "",
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
      path: `./output_files/${name}.pdf`,
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
    .then((res) => {
      console.log("Criação de PDF sucedida");
      console.log(res);
      console.log(typeof res);

      console.log("Success");
    })
    .catch((error) => {
      console.log("Algo de errado ocorreu ao tentar gerar o arquivo PDF");
      console.log(`Output error ${error}`);
    });
};

pdf_test();
