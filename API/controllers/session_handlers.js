const { StatusCodes } = require("http-status-codes");
const { session } = require("../models");

const get_session = async (sessionId) => {
  const session = await session.findOne({ where: { id: sessionId } });

  return session && session.valid ? session : null;
};

const invalidate_session = async (sessionId) => {
  const session = await session.findOne({ where: { id: sessionId } });

  if (!session) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ Message: "Inavlid session" });
  }

  session.update({ valid: false });

  await session.save();

  return session;
};

const create_session = async (username) => {
  const new_session = await session.create({ username: username });

  if (!create_session) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ Message: "Erro ao criar nova sessao" });
  }

  return new_session;
};

module.exports = { invalidate_session, get_session, create_session };
