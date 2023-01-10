const { StatusCodes } = require("http-status-codes");
const { session } = require("../models");

const get_session = async (sessionId) => {
  const f_session = await session.findOne({ where: { id: sessionId } });

  console.log(f_session);

  return session && session.valid ? session : null;
};

const invalidate_session = async (sessionId) => {
  const f_session = await session.findOne({ where: { id: sessionId } });

  if (!f_session) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ Message: "Inavlid session" });
  }

  session.update({ valid: false });

  await session.save();

  console.log(f_session);

  return f_session;
};

const create_session = async (username) => {
  const new_session = await session.create({ username: username });

  if (!new_session) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ Message: "Erro ao criar nova sessao" });
  }

  console.log(new_session);

  return new_session;
};

module.exports = { invalidate_session, get_session, create_session };
