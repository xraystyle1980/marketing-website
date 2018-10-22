
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EventSchema   = new Schema({
    eventbride_id: String,
    name: String,
    text: String,
    start: Date,
    url: String
});

module.exports = mongoose.model('Event', EventSchema);
