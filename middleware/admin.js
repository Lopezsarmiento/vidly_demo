'use strict';
const config = require('config');

module.exports = function (req, res, next) {
    // 401 unauthorized
    // 403 forbidden
    if (!config.get('requiresAuth')) return next();

    if (!req.user.isAdmin) return res.status(403).send('Access forbidden');
    next();
}