'use strict';
const asyncMiddleWare = require('../middleware/async');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validateGenre } = require('../models/genres');
const express = require('express');
const router = express.Router();

//endpoints

//get all genres
router.get('/', async (req, res) => {
	const genres = await Genre.find().sort('name');
	res.send(genres);
});


// get genres by Id
router.get('/:id', validateObjectId, async (req, res) => {
	console.log('id =>', req.params.id);

	let genre = await Genre.findById(req.param.id);
	// if genre not found
	if (!genre) {
		return res.status(404).send('genre does not exist');
	}
	res.send(genre);
});

// create genre
// this method should only be called by
// authenticated users
// auth param is a middleware function
// that authenticates the user.
router.post('/', auth, async (req, res) => {
	// validate data
	const { error } = validateGenre(req.body);
	if (error) {
		return res.status(400).send(error.details);
	}
	// add new genre
	let genre = new Genre({ name: req.body.name });

	genre = await genre.save();

	// return genre
	res.send(genre);
});

// update genre
router.put('/:id', async (req, res) => {
	// validate Id
	const { error } = validateGenre(req.body); // result.error -> obj destructuring
	if (error) {
		return res.status(400).send(error.details);
	}

	let genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

	// if genre not found
	if (!genre) {
		return res.status(404).send('genre does not exist');
	}

	// return genre
	res.send(genre);
});

// delete genre
router.delete('/:id', [auth, admin], async (req, res) => {
	// look for genre
	const genre = await Genre.findByIdAndRemove(req.params.id);
	// !exist -> return 404
	if (!genre) {
		return res.status(404).send('genre not found');
	}

	//return genres
	res.send(genre);
});

module.exports = router;