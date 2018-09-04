var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ContactSchema   = new Schema({
    name: String,
    email: String,
    body: String,
    createdAt: Date
});

module.exports = mongoose.model('Contact', ContactSchema);
