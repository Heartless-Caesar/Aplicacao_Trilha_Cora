const express = require("express");
const { auth_middleware } = require("./middleware/auth_middleware.js");
const app = express();
const cors = require("cors");
const body_parser = require("body-parser");
const cookie_parser = require("cookie-parser");
const port = process.env.PORT || 3000;
const { sequelize } = require("./models/index.js");
const { auth_router } = require("./routes/auth_routes.js");
const { walk_router } = require("./routes/walk_routes.js");
const { pdf_router } = require("./routes/pdf_routes.js");
const { deserialize_user } = require("./middleware/deserialize_user.js");
require("dotenv").config();

app.use(cors());

app.use(cookie_parser());

app.use(body_parser.json());

app.use(deserialize_user);

//Auth endpoints
app.use(auth_router);

//Start and finish walks endpoints
app.use(auth_middleware, walk_router);

app.use(auth_middleware, pdf_router);

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
