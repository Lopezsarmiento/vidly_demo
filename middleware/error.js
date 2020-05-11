'use strict';
const winston = require('winston');

module.exports = function (err, req, res, next) {

    // Logging levels
    // Error, warn, info, verbose, debug, silly

    // two ways of logging
    //winston.log('error', err.message);
    // or
    winston.error(err.message, err);

    // this only works inside the context of express.
    res.status(500).send(err.message);
}