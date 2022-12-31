const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken")

const auth_middleware = async (req, res) => {
    const auth_header = req.headers.authorization

    if (!auth_header || !auth_header.startsWith("Bearer ")) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .JSON({ Message: "No auth header" })
    }

    const token = auth_header.split(" ")[1]

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { id: user.id, email: user.email }

        next()
    } catch (error) {
        console.log(error)
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .JSON({ Message: "No auth header" })
    }
}

module.exports = { auth_middleware }
