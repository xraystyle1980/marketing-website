const Contact = require("../../models/contact");

const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require('../../helpers/passport')

router.get("/", ensureAuthenticated, async function (req, res) {
  //here we get the whole collection and sort by order
  let contacts = await Contact.find({})
    .sort("order")
    .exec();
  res.render("admin/contacts", {
    contacts: contacts,
    message: res.locals.message,
    color: res.locals.color
  });
});

router.get("/:id", ensureAuthenticated, function (req, res) {
  Contact.findById(req.params.id, function (err, story) {
    res.render("story", {
      story: story
    });
  });
});

router.get("/edit/:id", ensureAuthenticated, function (req, res) {
  Contact.findById(req.params.id, function (err, story) {
    res.render("editContact", {
      story: story,
      message: res.locals.message,
      color: res.locals.color
    });
  });
});

router.delete("/delete/:id", ensureAuthenticated, function (req, res) {
  Contact.remove(
    {
      _id: req.params.id
    },
    function (err, story) {
      if (err) res.send(err);

      console.log("Contact deleted");
      res.redirect("/contacts?alert=deleted");
    }
  );
});
router.put("/update/:id", ensureAuthenticated, function (req, res) {
  // use our story model to find the story we want
  Contact.findById(req.params.id, function (err, story) {
    if (err) res.send(err);

    story.name = req.body.name; // update the contacts info
    story.content = req.body.content; // update the contacts info
    story.order = req.body.order; // update the contacts info

    // save the story
    story.save(function (err) {
      if (err) res.send(err);

      console.log("Contact updated:", story);
      res.redirect("/contacts/edit/" + story._id + "?alert=deleted");
    });
  });
});
module.exports = router;
