'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../server');
const should = chai.should();
const puppeteer = require('puppeteer');
const sinon = require('sinon');

chai.use(chaiHttp);

let data = {
	"name": "jaj",
	"amount": 3200
}

let expected = {
	"message": "The auction is over!"
}

describe('/api/items/1/bids', () => {
	it('try bidding on laptop', (done) => {
		chai.request(server)
			.post('/api/items/1/bids')
			.set('Content-type', 'application/json')
			.send(data)
			.end((err, res) => {
				res.should.have.status(406);
				res.should.be.json;
				res.body.should.deep.equal(expected);
			})
			done()
	});
});

let browser;
let page;

before(async () => {
   browser = await puppeteer.launch({
		 headless: false,
		 slowMo: 80,
		 args: ['--window-size=1024,768']
	 })
   page = await browser.newPage()
 })

describe('should click around', () => {
	it('bidding on laptop with puppeteer', async () => {
		await page.goto('http://localhost:4500/', { waitUntil: 'networkidle2' })
		await page.click('input#name')
		await page.type('input#name', 'jaj', { delay: 50 })
		await page.click('input#amount')
		await page.type('input#amount', '3200', { delay: 50 })
		await page.waitForSelector('.message', { delay: 50 })
		await page.click('#submitbutton', { delay: 50 })
		const finalText = await page.$eval('.message', msg => msg.textContent)
		finalText.should.be.deep.equal('The auction is over!')
	}).timeout(10000);
});
