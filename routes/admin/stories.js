const Category = require("../../models/category");
const Story = require("../../models/story");

const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require('../../helpers/passport')

router.get("/", ensureAuthenticated, async function (req, res) {
  //here we get the whole collection and sort by order
  let stories = await Story.find({})
    .sort("order")
    .exec();
  let categories = await Category.find({}).exec();

  res.render("admin/stories", {
    stories: stories,
    categories: categories,
    message: res.locals.message,
    color: res.locals.color
  });
});

router.get("/:id", ensureAuthenticated, function (req, res) {
  Story.findById(req.params.id, function (err, story) {
    res.render("story", {
      story: story
    });
  });
});

router.get("/edit/:id", ensureAuthenticated, function (req, res) {
  Story.findById(req.params.id, async function (err, story) {
    let allcategories = await Category.find({}).exec();
    all = allcategories.map(cat => {
      let match = story.categories
        .map(pcat => pcat.toString())
        .includes(cat._id.toString());

      if (match) {
        return Object.assign({ selected: true }, cat._doc);
      } else {
        return cat._doc;
      }
    });

    res.render("editStory", {
      story: story,
      categories: all,
      message: res.locals.message,
      color: res.locals.color
    });
  });
});

router.post("/", ensureAuthenticated, function (req, res) {
  var story = new Story(); // create a new instance of the story model
  story.name = req.body.name; // set the stories name (comes from the request)
  story.content = req.body.content; // set the stories name (comes from the request)
  story.order = req.body.order; // set the stories name (comes from the
  story._categories = req.body.categories; // set the stories name (comes from the

  // save the story and check for errors
  story.save(function (err) {
    if (err) res.send(err);
    console.log("Story created:", story);
    res.redirect("/admin/stories?alert=created");
  });
});

router.delete("/delete/:id", ensureAuthenticated, function (req, res) {
  Story.remove(
    {
      _id: req.params.id
    },
    function (err, story) {
      if (err) res.send(err);

      console.log("Story deleted");
      res.redirect("/admin/stories?alert=deleted");
    }
  );
});
router.put("/update/:id", ensureAuthenticated, function (req, res) {
  // use our story model to find the story we want
  Story.findById(req.params.id, function (err, story) {
    if (err) res.send(err);

    story.name = req.body.name; // update the stories info
    story.content = req.body.content; // update the stories info
    story.order = req.body.order; // update the stories info
    story.categories = req.body.categories;

    // save the story
    story.save(function (err) {
      if (err) res.send(err);

      console.log("Story updated:", story);
      res.redirect("/admin/stories/edit/" + story._id + "?alert=updated");
    });
  });
});
module.exports = router;
