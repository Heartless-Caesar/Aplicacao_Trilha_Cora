const path = require("path");
const fs = require("fs");
const pdf = require("pdf-creator-node");
const { options } = require("../config/pdf_options");
const { User, certificados } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { StatusCodes } = require("http-status-codes");
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
  const localNames = {
    cid_go: "Cidade de Goiás",
    cocal: "Cocalzinho de Goiás",
    pire: "Pirenópolis",
    frans: "São Francisco de Goiás",
    jara: "Jaraguá",
    ita: "Itaguari",
    corumba: "Corumba",
  };
  let possibleId = null;
  // TODO Implementar hash JWT identificador único

  const inicioName = localNames[inicio] || inicio;
  const destinoName = localNames[destino] || destino;

  const certificateEntry = await certificados.findOne({
    where: { UserId: userId, origem: inicioName, destino: destinoName },
  });

  if (certificateEntry == null) {
    const cert = await certificados.create({
      origem: inicioName,
      destino: destinoName,
      UserId: userId,
    });

    possibleId = cert.id;
  }

  let document = {};
  const timestamp = new Date().toISOString().replace(/[^a-zA-Z0-9]/g, "");
  const uniqueIdentifier = Math.random().toString(36).substring(2, 8);

  const uniqueFilename = `cert_${timestamp}_${uniqueIdentifier}.pdf`;

  console.log(inicioName);
  console.log(destinoName);
  console.log(user.name);
  if (
    (inicioName != "Cidade de Goiás" && destinoName != "Corumba") ||
    (inicioName != "Corumba" && destinoName != "Cidade de Goiás")
  ) {
    document = {
      html: partial,
      data: {
        nome: user.name,
        origem: inicioName,
        destino: destinoName,
      },
      path: __dirname + "/output/" + uniqueFilename,
      type: "Buffer",
    };
  } else {
    document = {
      html: complete,
      data: {
        nome: user.username,
      },
      path: __dirname + "/output/" + uniqueFilename,
      type: "Buffer",
    };
  }

  if (possibleId != null) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Certificado não possível de ser gerado",
      possibleId: possibleId,
    });
  }

  return pdf
    .create(document, options(certificateEntry.id))
    .then((resp) => {
      console.log(resp);
      // Send the file to the client
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${uniqueFilename}`
      );
      res.sendFile(resp.filename);
      res.on("finish", () => {
        fs.unlink(resp.filename, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("File deleted successfully");
          }
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { generate_trial_cert };
