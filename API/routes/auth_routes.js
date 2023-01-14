const express = require('express')
const auth_router = express.Router()
const { base_url } = require('../utils/baseUrl')
const {
    register_user,
    login_user,
    logout,
} = require('../controllers/auth_controllers')

auth_router.route(`/Register`).post(register_user)

auth_router.route(`/Login`).post(login_user)

auth_router.route('/Logout').post(logout)

//auth_router.route("/Session").get

module.exports = { auth_router }
