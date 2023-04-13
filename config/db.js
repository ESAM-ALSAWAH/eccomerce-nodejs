const mongoose = require("mongoose");
require("dotenv").config();

module.exports = () =>
  mongoose
    .connect(process.env.DB, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("connected to db");
    })
    .catch(() => {
      console.log("error connecting to db");
    });
