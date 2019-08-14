'use strict';

const expect = require('chai').expect;
const printName = require('../lib/functions');

describe('printName()', () => {
	it('should print the name', () => {
		
		const results = printName({
			first: "Mark",
			last: "Hegedus"
		});
		
		expect(results).to.equal('Hegedus Mark');
	});
});
