
const Contact = require('../../models/contact');

const express = require('express')
const router = express.Router()

router.get('/',async  function(req, res) {
  //here we get the whole collection and sort by order
  let contacts = await Contact.find({}).sort('order').exec();
  res.render('admin/contacts', {
          contacts: contacts,
          message: res.locals.message,
          color: res.locals.color
      })
});

router.get('/:id', function(req, res) {
  Contact.findById(req.params.id, function(err, post) {
      res.render('post', {
          post: post
      })
  });
});

router.get('/edit/:id', function(req, res) {
  Contact.findById(req.params.id, function(err, post) {
      res.render('editContact', {
          post: post,
          message: res.locals.message,
          color: res.locals.color
      })
  });
});


router.delete('/delete/:id', function(req, res) {
    Contact.remove({
        _id: req.params.id
    }, function(err, post) {
        if (err)
            res.send(err);

        console.log("Contact deleted")
        res.redirect(res.locals.domain+"contacts?alert=deleted")
    });
});
router.put('/update/:id',function(req, res) {

    // use our post model to find the post we want
    Contact.findById(req.params.id, function(err, post) {

        if (err)
            res.send(err);

        post.name = req.body.name; // update the contacts info
        post.content = req.body.content; // update the contacts info
        post.order = req.body.order; // update the contacts info

        // save the post
        post.save(function(err) {
            if (err)
                res.send(err);

            console.log("Contact updated:", post);
            res.redirect(res.locals.domain+'contacts/edit/'+post._id+'?alert=deleted')
        });

    });
})
module.exports = router
