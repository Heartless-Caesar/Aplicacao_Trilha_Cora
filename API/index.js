const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`App listening on port 3000`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
