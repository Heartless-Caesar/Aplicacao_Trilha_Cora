const { sequelize, User, Walk, Locals } = require("../models");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const createLocals = async (userId) => {
  try {
    await Locals.create({
      corumba: false,
      cocal: false,
      pire: false,
      frans: false,
      jara: false,
      ita: false,
      itab: false,
      cid_go: false,
      salto: false,
      pirineus: false,
      caxam: false,
      radio: false,
      vila: false,
      bene: false,
      calci: false,
      ferr: false,
      UserId: userId,
    });
  } catch (error) {
    throw error;
  }
};

const register_user = async (req, res) => {
  const { username, password, email, name } = req.body;

  if (!username || !password || !email || !name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ Message: "Por favor insira todas as credenciais" });
  }

  const hashed_password = await bcrypt.hash(password, await bcrypt.genSalt(10));

  try {
    // Create the user
    const new_user = await User.create({
      username: username,
      name: name,
      password: hashed_password,
      email: email,
    });

    // Create a local entry for the user
    await createLocals(new_user.id);

    const token = jwt.sign(
      { id: new_user.id, username: new_user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );

    res.status(StatusCodes.CREATED).json({
      Message: "Usuário criado",
      token: token,
    });
  } catch (error) {
    console.error("Error creating user and local entry:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ Message: "Falha ao tentar criar o usuário" });
  }
};

const login_user = async (req, res) => {
  const { username, password } = req.body;

  const found_user = await User.findOne({ where: { username: username } });

  if (!found_user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ Message: "Usuario não encontrado" });
  }

  const check_password = await bcrypt.compare(password, found_user.password);

  if (!check_password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ Message: "Senha inserida incorreta" });
  }

  const token = jwt.sign(
    { id: found_user.id, username: found_user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  res.status(StatusCodes.OK).json({
    Message: "Usuario logado",
    token: token,
    id: found_user.id,
    username: found_user.username,
  });
};

module.exports = { register_user, login_user };
