const Category = require('../../models/category');
const Post = require('../../models/post');

const express = require('express')
const router = express.Router()

router.get('/', async function (req, res) {
  //here we get the whole collection and sort by order
  let posts = await Post.find({}).sort('order').exec();
  let categories = await Category.find({}).exec();

  res.render('admin/posts', {
    posts: posts,
    categories: categories,
    message: res.locals.message,
    color: res.locals.color
  })
});

router.get('/:id', function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    res.render('post', {
      post: post
    })
  });
});

router.get('/edit/:id', function (req, res) {
  Post.findById(req.params.id, async function (err, post) {
    let allcategories = await Category.find({}).exec();
    all = allcategories.map(cat => {
      let match = post.categories.map(pcat => pcat.toString()).includes(cat._id.toString())

      if (match) {
        return Object.assign({ selected: true }, cat._doc)
      } else {
        return cat._doc;
      }
    })

    res.render('editPost', {
      post: post,
      categories: all,
      message: res.locals.message,
      color: res.locals.color
    })
  });
});

router.post('/', function (req, res) {
  var post = new Post(); // create a new instance of the post model
  post.name = req.body.name; // set the posts name (comes from the request)
  post.content = req.body.content; // set the posts name (comes from the request)
  post.order = req.body.order; // set the posts name (comes from the
  post._categories = req.body.categories; // set the posts name (comes from the

  // save the post and check for errors
  post.save(function (err) {
    if (err)
      res.send(err);
    console.log("Post created:", post);
    res.redirect("/admin/posts?alert=created")
  });
});

router.delete('/delete/:id', function (req, res) {
  Post.remove({
    _id: req.params.id
  }, function (err, post) {
    if (err)
      res.send(err);

    console.log("Post deleted")
    res.redirect("/admin/posts?alert=deleted")
  });
});
router.put('/update/:id', function (req, res) {

  // use our post model to find the post we want
  Post.findById(req.params.id, function (err, post) {

    if (err)
      res.send(err);

    post.name = req.body.name; // update the posts info
    post.content = req.body.content; // update the posts info
    post.order = req.body.order; // update the posts info
    post.categories = req.body.categories;


    // save the post
    post.save(function (err) {
      if (err)
        res.send(err);

      console.log("Post updated:", post);
      res.redirect('/admin/posts/edit/' + post._id + '?alert=updated')
    });

  });
})
module.exports = router
