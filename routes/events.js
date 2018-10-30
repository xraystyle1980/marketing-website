const express = require('express')
const router = express.Router()

const EventsController = require('../controllers/EventsController');

router.get('/', EventsController.getEvents)
router.get('/fetchevents', EventsController.fetchevents);
router.get('/deleteevents', EventsController.deleteevents);

module.exports = router
