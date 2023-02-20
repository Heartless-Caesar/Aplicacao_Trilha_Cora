const { sequelize, User, local_validation } = require("../config/models");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const register_user = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ Message: "Por favor insira todas as credenciais" });
  }

  const hashed_password = await bcrypt.hash(password, await bcrypt.genSalt(10));

  const new_user = await User.create({
    username: username,
    password: hashed_password,
    email: email,
  });

  if (!new_user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ Message: "Falha ao tentar criar o usuário" });
  }

  const token = jwt.sign(
    { id: new_user.id, username: new_user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  res.status(StatusCodes.CREATED).json({
    Message: "Usuário criado",
  });
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

  const access_token = sign_jwt(
    {
      id: found_user.id,
      username: found_user.username,
      email: found_user.email,
    },
    process.env.JWT_SECRET,
    "1800s"
  );

  const refresh_token = sign_jwt(
    {
      id: found_user.id,
      username: found_user.username,
      email: found_user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1y",
    }
  );

  await User.update(
    { where: { username: found_user.username } },
    { refresh_token: refresh_token }
  );

  await User.save();

  res.cookie("refresh_token", refresh_token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.cookie("access_token", access_token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.status(StatusCodes.OK).json({ Message: "Usuario logado" });
};

module.exports = { register_user, login_user };
