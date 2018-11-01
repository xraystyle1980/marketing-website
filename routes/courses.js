const Category = require("../models/category");
const Course = require("../models/course");

const express = require("express");
const router = express.Router();

//COURSES ROUTING
router.get("/", async (req, res) => {
  try {
    //TODO get the real courses from the database model
    let courses = await Course.find({})
      .sort("name")
      .exec();
    let categories = await Category.find({}).exec();

    res.render("courses", {
      courses: courses
    });
  } catch (err) {
    console.log(err);
  }
});
router.get("/:course", async (req, res) => {
  try {
    //TODO get the real courses from the database model
    let course = Course.find({ name: req.params.course });
    console.log(course)
    res.render(`course`, {
      course: course

    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
