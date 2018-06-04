const Category = require('../models/Category');
const Post = require('../models/post');

const express = require('express')
const router = express.Router()

router.get('/',async  function(req, res) {
  console.log("GET Route: /posts")
  //here we get the whole collection and sort by order
  let posts = await Post.find({}).sort('order').exec();
  let categories = await Category.find({}).exec();
  res.render('posts', {
          posts: posts,
          categories: categories,
          message: res.locals.message,
          color: res.locals.color
      })
});

router.get('/:id', function(req, res) {
  console.log("GET Route: /posts/:id")
  Post.findById(req.params.id, function(err, post) {
      res.render('post', {
          post: post
      })
  });
});

router.get('/edit/:id', function(req, res) {
  console.log("GET Route: /posts/edit/:id")
  Post.findById(req.params.id, function(err, post) {
      res.render('editPost', {
          post: post,
          message: res.locals.message,
          color: res.locals.color
      })
  });
});

router.post('/', function(req, res) {
  console.log("POST Route: /posts")
  var post = new Post(); // create a new instance of the post model
  post.name = req.body.name; // set the posts name (comes from the request)
  post.content = req.body.content; // set the posts name (comes from the request)
  post.order = req.body.order; // set the posts name (comes from the
  post._categories = req.body.categories; // set the posts name (comes from the

  // save the post and check for errors
  post.save(function(err) {
      if (err)
        res.send(err);
      console.log("Post created:", post);
      res.redirect(res.locals.domain+"posts?alert=created")
  });
});

router.delete('/delete/:id', function(req, res) {
  console.log("DELETE Route: /posts/:id")
    console.log("DELETE");
    Post.remove({
        _id: req.params.id
    }, function(err, post) {
        if (err)
            res.send(err);

        console.log("Post deleted")
        res.redirect(res.locals.domain+"posts?alert=deleted")
    });
});
router.put('/update/:id',function(req, res) {

  console.log("Route: /posts/update/:id")
    // use our post model to find the post we want
    Post.findById(req.params.id, function(err, post) {

        if (err)
            res.send(err);

        post.name = req.body.name; // update the posts info
        post.content = req.body.content; // update the posts info
        post.order = req.body.order; // update the posts info

        // save the post
        post.save(function(err) {
            if (err)
                res.send(err);

            console.log("Post updated:", post);
            res.redirect(res.locals.domain+'posts/edit/'+post._id+'?alert=deleted')
        });

    });
})
module.exports = router
