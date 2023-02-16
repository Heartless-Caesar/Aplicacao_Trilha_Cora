const { local_codes, local_validation } = require("./config/models/index");

const test = async (start_code, finish_code, user_id) => {
  const found_codes = await local_codes.findAll({ where: { id: 3 } });

  if (start_code == found_codes[0].cbg) {
    switch (finish_code) {
      case found_codes[0].cog:
        await local_validation.update(
          { CBG: true, COG: true },
          { where: { user_id: user_id } }
        );
        break;
      case found_codes[0].prn:
        await local_validation.update(
          { CBG: true, COG: true, PRN: true },
          { where: { user_id: user_id } }
        );
        break;
      case found_codes[0].sfg:
        await local_validation.update(
          { CBG: true, COG: true, PRN: true, SFG: true },
          { where: { user_id: user_id } }
        );
        break;
      case found_codes[0].jrg:
        await local_validation.update(
          { CBG: true, COG: true, PRN: true, SFG: true, JRG: true },
          { where: { user_id: user_id } }
        );
        break;
      case found_codes[0].itg:
        await local_validation.update(
          { CBG: true, COG: true, PRN: true, SFG: true, JRG: true, ITG: true },
          { where: { user_id: user_id } }
        );
        break;
      case found_codes[0].cdg:
        await local_validation.update(
          {
            CBG: true,
            COG: true,
            PRN: true,
            SFG: true,
            JRG: true,
            ITG: true,
            CDG: true,
          },
          { where: { user_id: user_id } }
        );
        break;
      default:
        console.log("Invalid code");
        break;
    }
  }

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
