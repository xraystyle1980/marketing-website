var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema   = new Schema({
    categories: [ {type: Schema.ObjectId, ref: "Category"} ],
    name: String,
    content: String,
    order: Number
});

module.exports = mongoose.model('Post', PostSchema);
