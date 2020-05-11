'use strict';
const express = require('express');
const router = express.Router();
const config = require('config');

// Config
const appName = config.get('name');
const mail = config.get('mail.host');
//const mailPass = config.get('mail.password');
console.log(`Application Name: ${appName}`);
console.log(`mail: ${mail}`);
//console.log(`mailPass: ${mailPass}`);

router.get('/', (req, res) => {
    res.send(`Welcome to ${appName}`);
});


module.exports = router;