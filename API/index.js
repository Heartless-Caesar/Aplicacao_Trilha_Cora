const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { sequelize } = require("./models/index.js");
const { auth_router } = require("./routes/auth_routes.js");

//Auth endpoints
app.use(auth_router);

const start = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Connected to DB...");
    app.listen(port, () => {
      console.log(`App listening on port 3000`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
