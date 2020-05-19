"use strict";
const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  // connect to DB
  const dbconnection = config.get("db");
  console.log("dbConnection: ", dbconnection);
  mongoose
    .connect(`${dbconnection}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => console.log(`connected to : ${dbconnection} database`))
    .catch((err) => console.log("Caught on db.js::::", err.stack));
};
