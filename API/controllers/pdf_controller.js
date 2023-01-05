const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");

const partial = fs.readFileSync(path.join(`../assets/partial_cert.html`));
const complete = fs.readFileSync(path.join(`../assets/complete_cert.html`));

const generate_partial_trial_cert = async (req, res) => {
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
    };
  }

  pdf.create(document, options);
};
