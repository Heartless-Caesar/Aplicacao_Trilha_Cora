const fs = require("fs");
const path = require("path");
const complete = fs.readFileSync(
  path.join(`assets/complete_cert.html`),
  "utf8"
);
const partial = fs.readFileSync(path.join(`assets/partial_cert.html`), "utf8");
const { options } = require("./config/pdf_options");
const pdf = require("pdf-creator-node");
var stream = require("stream");

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
      type: "buffer",
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
      type: "buffer",
    };
  }

  // ! START
  // * Download file from memory
  /* 
  
//...
app.get('/download', function(request, response){
  //...
  var fileContents = Buffer.from(fileData, "base64");
  
  var readStream = new stream.PassThrough();
  readStream.end(fileContents);

  res.set('Content-disposition', 'attachment; filename=' + fileName);
  res.set('Content-Type', 'text/plain');

  readStream.pipe(response);
});
*/
  // ! END

  return pdf
    .create(document, options)
    .then((res) => {
      console.log("Criação de PDF sucedida");
      console.log(res);

      const fileContents = Buffer.from(res, "base64");

      const readStream = new stream.PassThrough();
      readStream.end(fileContents);

      res.set(
        "Content-disposition",
        "attachment; filename=" + `${document.data.name}.pdf`
      );
      res.set("Content-Type", "text/plain");

      readStream.pipe(res);
    })
    .catch((error) => {
      console.log("Algo de errado ocorreu ao tentar gerar o arquivo PDF");
      console.log(`Output error ${error}`);
    });
};

pdf_test();
