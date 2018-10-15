const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
var expect  = require('chai').expect;
var request = require('request');
var url = `http://${process.env.DOMAIN}:${process.env.PORT}`

it('Main page content', function(done) {
    request(url, function(error, response, body) {
        expect(body).to.contain('Digital Career Institute');
        done();
    });
});

it('Main page status', function(done) {
    request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Tests the test and checks if a not created site gives 404', function(done) {
    request(`${url}/xyz` , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});
