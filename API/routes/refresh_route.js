const {
    handle_refresh_token,
} = require('../controllers/refresh_token_controller')

const refresh_router = require('express').Router()

refresh_router.route('/refresh').get(handle_refresh_token)

module.exports = { refresh_router }
