"use strict";
//get modules needed.
const winston = require('winston');
const startUpDebugger = require('debug')('app:startup');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config');
require('./startup/validation');
require('./startup/prod')(app);

startUpDebugger('initializing...');

// PORT
// to set env variables
// run on terminal/cmd
// MAC:export PORT=5000 // WIN: set PORT=5000 
const port = process.env.PORT || 5000;
console.log(process.env.NODE_ENV);
const server = app.listen(port, () => console.log(`listening on port: ${port}`));

module.exports = server;