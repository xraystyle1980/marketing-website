//const server = require('../server.js')
var expect = require("chai").expect;
var chai = require("chai"),
  chaiHttp = require("chai-http");
chai.use(chaiHttp);
var request = require("supertest");

var server = require("../server");
//beforeEach(function () {

//});
//afterEach(function () {
//console.log('#####', server);
//server.close();
//});
describe("Basic DOM tests", function() {
  it("responds to /", function testSlash(done) {
    request(server)
      .get("/")
      .expect(200, done);
  });
  it("404 everything else", function testPath(done) {
    request(server)
      .get("/foo/bar")
      .expect(404, done);
  });
  //});

  it("Landingpage page content", function(done) {
    request(server)
      .get("/")
      .expect(200)
      .expect("Content-Type", /html/)
      .end(function(err, res) {
        if (err) return done(err);
        res.text.includes("Digital Career Institute");
        done();
      });
  });
  it("Stories page content", function(done) {
    request(server)
      .get("/stories")
      .expect(200)
      .expect("Content-Type", /html/)
      .end(function(err, res) {
        if (err) return done(err);
        res.text.includes("Stories route");
        done();
      });
  });
});
