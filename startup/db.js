'use strict';
const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
    // connect to DB
    const dbconnection = config.get('db');
    mongoose.connect(`${dbconnection}`, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
        .then(() => console.log(`connected to : ${dbconnection} database`));

}