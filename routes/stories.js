const Category = require("../models/category");
const Story = require("../models/story");

const express = require("express");
const router = express.Router();

router.get("/", async function (req, res) {
  //here we get the whole collection and sort by order
  let stories = await Story.find({})
    .sort("order")
    .exec();
  let categories = await Category.find({}).exec();

  res.render("stories", {
    stories: stories,
    categories: categories,
    message: res.locals.message,
    color: res.locals.color
  });
});

router.get("/:id", function (req, res) {
  Story.findById(req.params.id, function (err, story) {
    res.render("story", {
      story: story
    });
  });
});

module.exports = router;
