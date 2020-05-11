'use strict';
const express = require('express');
const helmet = require('helmet');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const customers = require('../routes/customers');
const home = require('../routes/home');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');


module.exports = function (app) {
    app.use(express.json());
    // parses http request
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(helmet());
    app.use('/api/genres', genres);
    app.use('/api/movies', movies);
    app.use('/api/customers', customers);
    app.use('/', home);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    // error middleware
    app.use(error);
}