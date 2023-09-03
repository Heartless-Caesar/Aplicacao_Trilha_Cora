import { Locals } from "../models/index";

const validateLocal = async (req, res) => {
  const { inicio, userId } = req.body;
  let locals;
  switch (inicio) {
    case "corumba":
      locals = Locals.findOne({
        where: {
          UserId: userId,
        },
      });

      locals.corumba = true;

      await locals.save();
      console.log(`Locail ${inicio}, do usuario de id ${userId} atualizado`);
      break;
    case "cocal":
      locals = Locals.findOne({
        where: {
          UserId: userId,
        },
      });

      locals.cocal = true;
      await locals.save();
      console.log(`Local ${inicio}, do usuario de id ${userId} atualizado`);
      break;
    case "pire":
      locals = Locals.findOne({
        where: {
          UserId: userId,
        },
      });

      locals.pire = true;
      await locals.save();
      console.log(`Local ${inicio}, do usuario de id ${userId} atualizado`);
      break;
    case "frans":
      locals = Locals.findOne({
        where: {
          UserId: userId,
        },
      });

      locals.frans = true;
      await locals.save();
      console.log(`Local ${inicio}, do usuario de id ${userId} atualizado`);
      break;
    case "jara":
      locals = Locals.findOne({
        where: {
          UserId: userId,
        },
      });

      locals.jara = true;
      await locals.save();
      console.log(`Local ${inicio}, do usuario de id ${userId} atualizado`);
      break;
    case "ita":
      locals = Locals.findOne({
        where: {
          UserId: userId,
        },
      });

      locals.ita = true;
      await locals.save();
      console.log(`Local ${inicio}, do usuario de id ${userId} atualizado`);
      break;
    case "itab":
      locals = Locals.findOne({
        where: {
          UserId: userId,
        },
      });

      locals.itab = true;
      await locals.save();
      console.log(`Local ${inicio}, do usuario de id ${userId} atualizado`);
      break;
    case "cid_go":
      locals = Locals.findOne({
        where: {
          UserId: userId,
        },
      });

      locals.cid_go = true;
      await locals.save();
      console.log(`Local ${inicio}, do usuario de id ${userId} atualizado`);
      break;
    default:
      break;
  }
};

module.exports = { validateLocal };
