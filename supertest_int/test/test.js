'use strict';

const app = require('../server');
const test = require('tape');
const request = require('supertest');

test('testing connection to database', t => {
	request(app)
		.get(`/api/items`)
		.expect('Content-type', /json/)
		.expect(200)
		.end((err, res) => {
			const expected = [{
        	"id": 1,
        	"title": "Laptop",
        	"expiry_date": "2019-06-07T07:43:43.000Z"
    		},
    		{
        	"id": 2,
        	"title": "book",
        	"expiry_date": "2019-06-07T10:20:43.000Z"
    	}];
			const actual = res.body;

			t.error(err, 'No error');
			t.same(actual, expected, 'Received expected answer');
			t.end();
		});
});
