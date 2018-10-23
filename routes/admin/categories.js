const Category = require("../../models/category");

const express = require("express");
const router = express.Router();

router.get("/", async function(req, res) {
  //here we get the whole collection and sort by order
  let categories = await Category.find({}).exec();
  res.render("admin/categories", {
    categories: categories,
    message: res.locals.message,
    color: res.locals.color
  });
});

router.get("/:id", function(req, res) {
  Category.findById(req.params.id, function(err, category) {
    res.render("category", {
      category: category
    });
  });
});

router.get("/edit/:id", function(req, res) {
  Category.findById(req.params.id, function(err, category) {
    res.render("editCategory", {
      category: category,
      message: res.locals.message,
      color: res.locals.color
    });
  });
});

router.post("/", function(req, res) {
  var category = new Category(); // create a new instance of the category model
  category.name = req.body.name; // set the categories name (comes from the request)

  // save the category and check for errors
  category.save(function(err) {
    if (err) res.send(err);
    console.log("Category created:", category);
    res.redirect("/categories?alert=created");
  });
});

router.delete("/delete/:id", function(req, res) {
  Category.remove(
    {
      _id: req.params.id
    },
    function(err, category) {
      if (err) res.send(err);

      console.log("Category deleted");
      res.redirect("/categories?alert=deleted");
    }
  );
});
router.put("/update/:id", function(req, res) {
  // use our category model to find the category we want
  Category.findById(req.params.id, function(err, category) {
    if (err) res.send(err);

    category.name = req.body.name; // update the categories info

    // save the category
    category.save(function(err) {
      if (err) res.send(err);

      console.log("Category updated:", category);
      res.redirect("/categories/edit/" + category._id + "?alert=deleted");
    });
  });
});
module.exports = router;
