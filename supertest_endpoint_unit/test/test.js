'use strict';

const server = require('./../server/server');
const test = require('tape');
const request = require('supertest');

test('Names of mentors returned at /mentors endpoint', t => {
	request(server)
		.get('/mentors')
		.expect('Content-type', /json/)
		.expect(200)
		.end((err, res) => {
			let expectedUsers = ['Blanka', 'Sanyi', 'Peter'];

			t.error(err, 'No error');
			t.same(res.body, expectedUsers, 'Correct result');
			t.end()
		});
});

