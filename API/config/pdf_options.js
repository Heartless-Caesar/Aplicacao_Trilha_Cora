const options = {
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
  childProcessOptions: { env: { OPENSSL_CONF: "/dev/null" } },
  timeout: 1000,
};

module.exports = { options };
