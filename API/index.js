const express = require("express");
const { auth_middleware } = require("./middleware/auth_middleware.js");
const app = express();
const cors = require("cors");
const body_parser = require("body-parser");
const { sequelize } = require("./config/models/index.js");
const { auth_router } = require("./routes/auth_routes.js");
const { walk_router } = require("./routes/walk_routes.js");
const { pdf_router } = require("./routes/pdf_routes.js");
const { code_router } = require("./routes/code_routes.js");
const { refresh_router } = require("./routes/refresh_route");
const cookie_parser = require("cookie-parser");
const { logout_router } = require("./routes/logout_route.js");
require("dotenv").config();
const port = process.env.PORT || 3000;

// * Enable CORS
app.use(cors());

// * Cookie middleware
app.use(cookie_parser());

// * JSON parser
app.use(body_parser.json());

app.use(code_router);

// * Auth endpoints
app.use(auth_router);

// * Logs user out
app.use(logout_router);

// * Start and finish walks endpoints
app.use(auth_middleware, walk_router);

app.use(auth_middleware, pdf_router);

app.use(auth_middleware, refresh_router);

app.use(auth_middleware, pdf_router);

// * Create entities according to db tables
const start = async () => {
  try {
    await sequelize.sync();
    console.log(`Connected to DB in ${process.env.NODE_ENV} environment`);
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
