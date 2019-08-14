'use strict';

const express = require('express');
const app = express();

const mentors = ['Blanka', 'Sanyi', 'Peter'];

app.get('/mentors', (req, res) => {
	res.json(mentors);
});

module.exports = app;
