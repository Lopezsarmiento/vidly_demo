const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customers');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Routes
router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut'); // sort by (-dateOut) in desc order
    res.send(rentals);
});

router.post('/', async (req, res) => {

    // validate request
    const { error } = validate(req.body);
    if (error) return res.status(400).send(erro.details[0].message);

    // get customer
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customerId ');

    // get movie
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movieId ');

    // check stock
    if (movie.numberInStock === 0) return res.status(400).send('Movie not Available');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    rental = await rental.save();

    // decrement movie stock
    movie.numberInStock--;
    movie.save();

    res.send(rental);
});