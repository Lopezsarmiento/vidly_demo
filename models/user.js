'use strict';
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi'); // uppercased as it returns a class

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 255
    },
    // to enforce pass complexity
    // implement joi-password-complexity
    // from npm
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            isAdmin: this.isAdmin
        },
        config.get('jwtPrivateKey'));
}

// compile the schema into a module
const User = mongoose.model('User', userSchema);


function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    };
    return Joi.validate(user, schema);
}

function validateExistingUser(user) {
    const schema = {
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateExistingUser = validateExistingUser;