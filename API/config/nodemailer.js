const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function enviarEmail(path, file) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "joaovictorcsaad@gmail.com", // generated ethereal user
      pass: "somewhere123,", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Cesa 👻" "joaovictorcsaad@gmail.com"', // sender address
    to: "joaovictorcsaad@gmail.com", // SUBSTITUIR POR "${email}" PARA ENVIAR AO PRESTADOR
    subject: "Dados referentes às guias", // Subject line
    text: "Sent certificate", // plain text body
    attachments: {
      path: path,
      filename: file,
    },
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = { enviarEmail };
