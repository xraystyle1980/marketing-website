const Post = require('../models/post');

const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
    Post.find(function(err, posts) {
        res.render('index', {
            posts: posts
        })
    });
});

module.exports = router
