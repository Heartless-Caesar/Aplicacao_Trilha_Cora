const { local_codes } = require("../config/models/index");
const { StatusCodes } = require("http-status-codes");

const register_codes = async (req, res) => {
  const {
    cbg_code,
    cog_code,
    prn_code,
    sfg_code,
    jrg_code,
    itg_code,
    cdg_code,
  } = req.body;

  const codes = await local_codes.findOne({ where: { id: 1 } });

  if (!codes) {
    await local_codes.create({
      cbg: cbg_code,
      cog: cog_code,
      prn: prn_code,
      sfg: sfg_code,
      jrg: jrg_code,
      itg: itg_code,
      cdg: cdg_code,
    });

    return res.status(StatusCodes.CREATED).json({ msg: "Codes created" });
  }

  res.status(StatusCodes.BAD_REQUEST).json({ msg: "Codes already registered" });
};

const update_codes = async (req, res) => {
  const {
    cbg_code,
    cog_code,
    prn_code,
    sfg_code,
    jrg_code,
    itg_code,
    cdg_code,
  } = req.body;

  await local_codes.update(
    {
      cbg: cbg_code,
      cog: cog_code,
      prn: prn_code,
      sfg: sfg_code,
      jrg: jrg_code,
      itg: itg_code,
      cdg: cdg_code,
    },
    {
      where: { id: 3 },
    }
  );

  res.status(StatusCodes.OK).json({ msg: "Codes updated" });
};

module.exports = { register_codes, update_codes };
