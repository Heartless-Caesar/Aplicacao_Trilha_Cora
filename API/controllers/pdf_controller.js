const path = require("path");
const fs = require("fs");
const pdf = require("pdf-creator-node");
const { options } = require("../config/pdf_options");
const { User } = require("../models");
let resultPath = "";
// const partialPath = path.join(__dirname, "../assets/partial_cert.html", "utf8");
// const completePath = path.join(
//   __dirname,
//   "../assets/complete_cert.html",
//   "utf8"
// );

let outputPath = "";

const partial = fs.readFileSync(
  path.join(`${__dirname}/../assets/partial_cert.html`),
  "utf8"
);
const complete = fs.readFileSync(
  path.join(`${__dirname}/../assets/complete_cert.html`),
  "utf8"
);

const generate_trial_cert = async (req, res) => {
  const { inicio, destino, userId } = req.query;
  const user = await User.findOne({ where: { id: userId } });

  let document = {};
  let filename = "";

  if (inicio !== "Cidade de Goiás" && destino !== "Corumbá de Goiás") {
    filename = "partial_cert.pdf";
    document = {
      html: partial,
      data: {
        nome: user.username,
        origem: inicio,
        destino: destino,
      },
      path: __dirname + "/output/" + filename,
      type: "Buffer",
    };
  } else {
    filename = "complete_cert.pdf";
    document = {
      html: complete,
      data: {
        name: user.username,
      },
      path: __dirname + "/output/" + filename,
      type: "Buffer",
    };
  }

  return pdf
    .create(document, options)
    .then((resp) => {
      console.log(resp);
      // Send the file to the client
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
      res.sendFile(resp.filename);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { generate_trial_cert };
