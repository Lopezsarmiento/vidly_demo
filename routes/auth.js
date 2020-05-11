'use strict';
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateExistingUser } = require('../models/user');
const express = require('express');
const router = express.Router();

//endpoints

//Register new users
router.post('/', async (req, res) => {
    // validate data
    const { error } = validateExistingUser(req.body);

    if (error) return res.status(400).send(error.details);

    // check if user is already register
    let user = await User.findOne({ email: req.body.email });
    // indicate message when user with that specific email not found
    if (!user) return res.status(400).send('Invalid email or password');

    // validate Password
    let inputPass = req.body.password;
    let userStoredPass = user.password;
    const isValidPassword = await bcrypt.compare(inputPass, userStoredPass);

    if (!isValidPassword) return res.status(400).send('Invalid email or password');

    // Get JsonWebToken
    const token = user.generateAuthToken();
    res.send(token);
});


module.exports = router;