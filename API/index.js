const express = require("express")
const { auth_middleware } = require("./middleware/auth_middleware.js")
const app = express()
const cors = require("cors")
const body_parser = require("body-parser")
const port = process.env.PORT || 3000
const { sequelize } = require("./models/index.js")
const { auth_router } = require("./routes/auth_routes.js")
require("dotenv").config()

app.use(cors())

app.use(body_parser.json())

//Auth header verification middleware
//app.use(auth_middleware)

//Auth endpoints
app.use(auth_router)

const start = async () => {
    try {
        await sequelize.sync()
        console.log(`Connected to DB in ${process.env.NODE_ENV} environment`)
        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
