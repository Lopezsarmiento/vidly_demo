"use strict";
const { Customer, validate } = require('../models/customers');
const express = require('express');
const router = express.Router();

//endpoints

//get all genres
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

// create genre
router.post('/', async (req, res) => {
    // validate data
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details);
    }
    // add new customer
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    customer = await customer.save();

    // return genre
    res.send(customer);
});

module.exports = router;