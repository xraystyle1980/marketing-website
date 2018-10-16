"use strict";
const app = require('../server.js')
var expect  = require('chai').expect;
var request = require('request');
var { url } = require('../helper.js')
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURL);
const db = mongoose.connection;
const Post = require('../models/post');

describe('Posts', function() {
  describe('DOM tests', function() {

    it('checks for some text in the dom', function(done) {
        request(`http://localhost:4000/posts`, function(error, response, body) {
            expect(body).to.contain('Posts route');
            done();
        });
    });
  });
  describe('Model tests', function() {
    it('should save without error', function(done) {
      var post = new Post({name: 'tobi', order: 1, content: "Lorem ipsum dolor sit amed."});
      post.save(function(err) {
        if (err) done(err);
        else done();
      });
    });
  });
});
describe('Database Tests', function() {
  before(function (done) {
    mongoose.connect('mongodb://localhost/testDatabase');

    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });
  describe('Test Database', function() {
    //Save object with 'name' value of 'Mike"
    it('New name saved to test database', function(done) {
      var testPost = new Post({
        name: 'Mike'
      });

      testPost.save(done);

    });
    //it('Dont save incorrect format to database', async function(done) {
      ////Attempt to save with wrong info. An error should trigger
      //var wrongSave = new Post({
        //notPost: 'Not Mike'
      //});
      //var Save = await wrongSave.save();
      //console.log('#####',  Save);
      //wrongSave.save(err => {
        //if(err) { return done(); }
        //throw new Error('Should generate error!');
      //});
    //});
    it('Should retrieve data from test database', function(done) {
      //Look up the 'Mike' object previously saved.
      Post.find({name: 'Mike'}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });
  });
  //After all tests are finished drop database and close connection
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
      //process.exit()
    });
  });
});
//describe('Connection', async function() {
  //var tobi = new Post({name: 'tobi', order: 1, content: "Lorem ipsum dolor sit amed."}),
    //loki = new Post({name: 'loki', order: 2, content: "Lorem ipsum dolor sit amed."}),
    //jane = new Post({name: 'jane', order: 3, content: "Lorem ipsum dolor sit amed."});
  //await Post.remove()
  
  //beforeEach(function(done) {
    //db.clear(function(err) {
      //if (err) return done(err);
      //db.save([tobi, loki, jane], done);
    //});
  //});

  //describe('#find()', function() {
    //it('respond with matching records', function(done) {
      //db.find({type: 'Post'}, function(err, res) {
        //if (err) return done(err);
        //res.should.have.length(3);
        //done();
      //});
    //});
  //});
//});
