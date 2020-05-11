'use strict';
const winston = require('winston') // logging library
//require('winston-mongodb'); // logging erros in mongodb
require('express-async-errors'); // package to deal with try/catch errors on routes.

module.exports = function () {
    // Creates a logfile for logging errors
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    // Log errors on db
    // winston.add(new winston.transports.MongoDB(
    //     //level value indicates what kind of log level will be considered for logging
    //     { db: 'mongodb://localhost/vidly', collection: 'errorlogs', level: 'error' }));

    // Logs uncaught exceptions
    process.on('uncaughtException', (ex) => {

        console.log('uncaughtException', ex.message);
        process.exit(1);
    });

    // Logs unhandled rejections
    process.on('unhandledRejection', (ex) => {
        console.log('WE GOT AN UNHANDLED REJECTION!!');
        console.log('error', ex.message);
        process.exit(1);
    });

    // test for uncaught exceptions logging.
    //throw new Error('Something failed during startup');

    // test for unhandled rejections
    // const p = Promise.reject(new Error('something failed miserably!!!'));
    // p.then(() => console.log(done));

}