const { StatusCodes } = require("http-status-codes");
const { Locals } = require("../models/index");

const validateLocal = async (req, res) => {
  const { local, userId } = req.body;
  let update;

  switch (local) {
    case "corumba":
      update = Locals.findOne({
        where: {
          UserId: userId,
        },
      });

      update.corumba = true;

      await update.save();
      console.log(`Locail ${local}, do usuario de id ${userId} atualizado`);
      break;
    case "cocal":
      update = Locals.findOne({
        where: {
          UserId: userId,
        },
      });

      update.cocal = true;
      await update.save();
      console.log(`Local ${local}, do usuario de id ${userId} atualizado`);
      break;
    case "pire":
      update = Locals.findOne({
        where: {
          UserId: userId,
        },
      });

      update.pire = true;
      await update.save();
      console.log(`Local ${local}, do usuario de id ${userId} atualizado`);
      break;
    case "frans":
      update = Locals.findOne({
        where: {
          UserId: userId,
        },
      });

      update.frans = true;
      await update.save();
      console.log(`Local ${local}, do usuario de id ${userId} atualizado`);
      break;
    case "jara":
      update = Locals.findOne({
        where: {
          UserId: userId,
        },
      });

      update.jara = true;
      await update.save();
      console.log(`Local ${local}, do usuario de id ${userId} atualizado`);
      break;
    case "ita":
      update = Locals.findOne({
        where: {
          UserId: userId,
        },
      });

      update.ita = true;
      await update.save();
      console.log(`Local ${local}, do usuario de id ${userId} atualizado`);
      break;
    case "itab":
      update = Locals.findOne({
        where: {
          UserId: userId,
        },
      });

      update.itab = true;
      await update.save();
      console.log(`Local ${local}, do usuario de id ${userId} atualizado`);
      break;
    case "cid_go":
      update = Locals.findOne({
        where: {
          UserId: userId,
        },
      });

      update.cid_go = true;
      await update.save();
      console.log(`Local ${local}, do usuario de id ${userId} atualizado`);
      break;
    default:
      console.log(`Algo de rrado ocorreu ao atualizar o local`);
      break;
  }

  res.status(StatusCodes.OK).json({
    Message: "Local atualizado",
  });
};

const fetchAllLocals = async (req, res) => {
  const { userId } = req.body;

  console.log(userId);

  const allLocals = await Locals.findAll({ where: { userId: userId } });

  res.status(StatusCodes.OK).json({
    Locals: {
      allLocals: allLocals,
    },
  });
};

module.exports = { validateLocal, fetchAllLocals };
