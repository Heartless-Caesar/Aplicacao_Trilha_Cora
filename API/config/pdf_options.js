const options = (id) => {
  return {
    format: "A4",
    orientation: "landscape",
    border: "10mm",
    header: {
      height: "60mm",
      // contents:
      //   '<div style="text-align: center; margin: auto;">Certificado Trilha de Cora Coralina</div>',
    },
    footer: {
      height: "10mm",
      contents: {
        default: `<span style="color: #444;">Identificador único: ${id}</span>`,
      },
    },
    localUrlAccess: true,
    childProcessOptions: { env: { OPENSSL_CONF: "/dev/null" } },
    timeout: 10000,
  };
};

module.exports = { options };
