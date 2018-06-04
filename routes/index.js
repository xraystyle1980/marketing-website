const Post = require('../models/post');

const express = require('express')
const router = express.Router()

//public frontend where you can view the posts
router.get('/', function(req, res) {
  Post.find({}).sort('order').exec(function(err, posts) { 
      res.render('index', {
        posts: posts
      })
  });
});

module.exports = router
