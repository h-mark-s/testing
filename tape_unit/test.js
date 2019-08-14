'use strict';

const rotate = require('./function');
const test = require('tape');

let matrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
];

test('rotating matrix', t => {
	const actual = rotate(matrix);
	const expected = [
		[7, 4, 1],
		[8, 5, 2],
		[9, 6, 3]
	];

	t.deepEqual(actual, expected);
	t.end();
});
