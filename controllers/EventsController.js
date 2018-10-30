require('dotenv').config({ path: __dirname + '/../.env' });
const request = require("request");
const Event = require('../models/event');

module.exports.getEvents = async (req, res) => {
  const events = await Event.find()

  res.render('events', {
    events: events
  })
}

module.exports.fetchevents = async (req, res) => {
  try {
    request(`https://www.eventbriteapi.com/v3/organizers/16608751086/events/?token=${process.env.EVENTBRIDE_API_KEY}&order_by=start_desc`, async (error, response, body) => {
      body = JSON.parse(body)
      if (error) {
        console.log('error:', error);
      }
      const events = await body.events.map(async event => {
        const oldevent = await Event.findOne({
          eventbride_id: event.id
        })
        if (!oldevent) {
          const newevent = new Event({
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
  } catch (err) {
    console.log(err);
    res.redirect("/events?alert=created")
  }
}

module.exports.deleteevents = async (req, res) => {
  try {
    Event.collection.drop();
    res.redirect("/events?alert=created")
  } catch (err) {
    console.log(err);
    res.redirect("/events?alert=created")
  }
}
