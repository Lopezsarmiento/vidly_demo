'use strict';
const auth = require('../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateUser } = require('../models/user');
const express = require('express');
const router = express.Router();

//endpoints

//Register new users
router.post('/', async (req, res) => {
    // validate data
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details);
    }

    // check if user is already register
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User is already registered');

    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    // you can also use loadash to get new user values
    const userProps = _.pick(req.body, ['name', 'email', 'password']);
    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    // hash password process
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash password
    user.password = await bcrypt.hash(user.password, salt);
    // save user to DB
    await user.save();

    // Get user props to pass to front
    let finalUser = _.pick(user, ['name', 'email']); //loadash.pick retrieves only the properties requested.

    // Get JsonWebToken
    const token = user.generateAuthToken();
    console.log('jwt: ', token);
    // return user
    res
        .header('x-auth-token', token)
        .header('access-control-expose-headers', 'x-auth-token')
        .send(_.pick(user, ['name', 'email']));
});

//get all users
router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

module.exports = router;