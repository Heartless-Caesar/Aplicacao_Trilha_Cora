const { local_codes } = require("./config/models/index");

const test = async (req, res) => {
  const found_codes = await local_codes.findAll({ where: { id: 3 } });

  console.log(
    found_codes[0].cbg,
    found_codes[0].cog,
    found_codes[0].prn,
    found_codes[0].sfg,
    found_codes[0].jrg,
    found_codes[0].itg,
    found_codes[0].cdg
  );
};

test();
