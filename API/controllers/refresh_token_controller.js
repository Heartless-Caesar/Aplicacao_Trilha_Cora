const { User } = require('../models')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { sign_jwt, verify_jwt } = require('../utils/jwt_utils')
require('dotenv').config()

const handle_refresh_token = async (req, res) => {
    const { username, password, email } = req.body

    if (!username || !password || !email) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ Message: 'Por favor insira todas as credenciais' })
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
            .json({ Message: 'Falha ao tentar criar o usuário' })
    }

    res.status(StatusCodes.CREATED).json({
        Message: 'Usuário criado',
    })
}

const login_user = async (req, res) => {
    const { username, password } = req.body

    const found_user = await User.findOne({ where: { username: username } })

    if (!found_user) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ Message: 'Usuario não encontrado' })
    }

    const check_password = await bcrypt.compare(password, found_user.password)

    if (!check_password) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ Message: 'Senha inserida incorreta' })
    }

    const access_token = sign_jwt(
        {
            id: found_user.id,
            username: found_user.username,
            email: found_user.email,
        },
        process.env.JWT_SECRET,
        '600s'
    )

    const refresh_token = sign_jwt(
        {
            id: found_user.id,
            username: found_user.username,
            email: found_user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d',
        }
    )

    await User.update(
        { where: { username: found_user.username } },
        { refresh_token: refresh_token }
    )

    await User.save()

    res.cookie('refresh_token', refresh_token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
    })

    res.status(StatusCodes.OK).json({
        Message: 'Usuario logado',
        Payload: verify_jwt(refresh_token).payload,
    })
}

const logout = async (req, res) => {
    res.cookie('access_token', '', {
        maxAge: 0,
        httpOnly: true,
    })

    res.cookie('refresh_token', '', {
        maxAge: 0,
        httpOnly: true,
    })

    res.status(StatusCodes.OK).json({ Message: 'User logged out' })
}

module.exports = { register_user, login_user, logout }
