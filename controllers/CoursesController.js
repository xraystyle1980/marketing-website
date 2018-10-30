module.exports.getCourses = async (req, res) => {
  try {
    //TODO get the real courses from the database model
    //const courses = res.app.locals.course

    res.render("courses", {
      //courses: courses
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports.getSingleCourse = async (req, res) => {
  try {
    //TODO get the real courses from the database model
    const courses = res.app.locals.courses;
    const course = courses.find(n => n.name == req.params.course);
    res.render(`course`, {
      course: course
    });
  } catch (err) {
    console.log(err);
  }
}
