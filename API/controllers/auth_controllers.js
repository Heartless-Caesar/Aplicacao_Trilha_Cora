const { sequelize, User, Walk } = require("../models")
const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const register_user = async (req, res) => {
    const { username, password, email } = req.body

    if (!username || !password || !email) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .JSON({ Message: "Por favor insira todas as credenciais" })
    }

    const hashed_password = await bcrypt.hash(
        password,
        await bcrypt.genSalt(10)
    )

    const new_user = await User.create({
        username: username,
        password: hashed_password,
        email: email,
    })

    if (!new_user) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .JSON({ Message: "Falha ao tentar criar o usuário" })
    }

    const token = jwt.sign({ id: new_user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_IN,
    })

    res.status(StatusCodes.CREATED).json({
        Message: "Usuário criado",
        token: token,
    })
}

const login_user = async (req, res) => {
    const { username, password } = req.body

    const found_user = await User.findOne({ where: { username: username } })

    if (!found_user) {
        return res
            .staus(StatusCodes.NOT_FOUND)
            .JSON({ Message: "Usuario não encontrado" })
    }

    const check_password = await bcrypt.compare(password, found_user.password)

    if (!check_password) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .JSON({ Message: "Senha inserida incorreta" })
    }

    const token = jwt.sign({ id: found_user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_IN,
    })

    res.status(StatusCodes.OK).json({ Message: "Usuario logado", token: token })
}

module.exports = { register_user, login_user }
