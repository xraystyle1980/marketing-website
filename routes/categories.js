const Category = require('../models/category');

const express = require('express')
const router = express.Router()

router.get('/',async  function(req, res) {
  console.log("GET Route: /categories")
  //here we get the whole collection and sort by order
  let categories = await Category.find({}).exec();
  res.render('categories', {
          categories: categories,
          message: res.locals.message,
          color: res.locals.color
      })
});

router.get('/:id', function(req, res) {
  console.log("GET Route: /categories/:id")
  Category.findById(req.params.id, function(err, category) {
      res.render('category', {
          category: category
      })
  });
});

router.get('/edit/:id', function(req, res) {
  console.log("GET Route: /categories/edit/:id")
  Category.findById(req.params.id, function(err, category) {
      res.render('editCategory', {
          category: category,
          message: res.locals.message,
          color: res.locals.color
      })
  });
});

router.post('/', function(req, res) {
  console.log("POST Route: /categories")
  var category = new Category(); // create a new instance of the category model
  category.name = req.body.name; // set the categories name (comes from the request)

  // save the category and check for errors
  category.save(function(err) {
      if (err)
        res.send(err);
      console.log("Category created:", category);
      res.redirect(res.locals.domain+"categories?alert=created")
  });
});

router.delete('/delete/:id', function(req, res) {
  console.log("DELETE Route: /categories/:id")
    console.log("DELETE");
    Category.remove({
        _id: req.params.id
    }, function(err, category) {
        if (err)
            res.send(err);

        console.log("Category deleted")
        res.redirect(res.locals.domain+"categories?alert=deleted")
    });
});
router.put('/update/:id',function(req, res) {

  console.log("Route: /categories/update/:id")
    // use our category model to find the category we want
    Category.findById(req.params.id, function(err, category) {

        if (err)
            res.send(err);

        category.name = req.body.name; // update the categories info

        // save the category
        category.save(function(err) {
            if (err)
                res.send(err);

            console.log("Category updated:", category);
            res.redirect(res.locals.domain+'categories/edit/'+category._id+'?alert=deleted')
        });

    });
})
module.exports = router
