require('dotenv').config({ path: __dirname + '/../.env' });
const Event = require('../models/event');

const express = require('express')
const router = express.Router()

var request = require("request");

//COURSES ROUTING
router.get('/', async (req, res) => {
    var events = await Event.find()

    res.render('events', {
      events: events
    })
})
router.get('/fetchevents', async (req, res) => {
  try {
    //TODO get the real courses from the database model
    //const courses = res.app.locals.course

    request(`https://www.eventbriteapi.com/v3/organizers/16608751086/events/?token=${process.env.EVENTBRIDE_API_KEY}&order_by=start_desc`, async (error, response, body) => {
      body = JSON.parse(body)
      var events = await body.events.map(async event => {
        var oldevent = await Event.findOne({ eventbride_id: event.id })
        if(!oldevent) {
          var newevent = new Event({
            eventbride_id: event.id, 
            name: event.name.text,
            text: event.description.text,
            start: event.start.local,
            url: event.url
          })
          await newevent.save()
          return newevent
        }
      })
      res.redirect("/events?alert=created")


    });
  }
  catch(err) {
    console.log(err);
    res.redirect("/events?alert=created")
  }
});
router.get('/deleteevents', async (req, res) => {
  try {
      Event.collection.drop();
    res.redirect("/events?alert=created")
  }
  catch(err) {
    console.log(err);
    res.redirect("/events?alert=created")
  }
});

module.exports = router
