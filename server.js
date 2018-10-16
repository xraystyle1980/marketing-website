
var { url, mongopath } = require('./helper.js')
const express = require('express');
const app = express();
var path = require('path');
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST

//app.use(express.static('./css'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.log(req.method, req.headers.host + req.url)
  next()
});
app.use(function (req, res, next) {
  res.locals.domain = `http://${url}` || "/";
  if (req.query.alert === "created") {
    res.locals.message = "Post created successfully!"
    res.locals.color = "alert-success"
  } else if (req.query.alert === "deleted") {
    res.locals.message = "Post deleted successfully!"
    res.locals.color = "alert-success"
  } else if (req.query.alert === "updated") {
    res.locals.message = "Post updated successfully!"
    res.locals.color = "alert-success"
  }
  next();
});
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

var mongoose = require('mongoose');
mongoose.connect(mongopath);

let categoryRoutes = require('./routes/admin/categories');
let postRoutes = require('./routes/posts');
let postsRoutes = require('./routes/admin/posts');
let indexRoutes = require('./routes/index');
let contactsRoutes = require('./routes/admin/contacts');

app.use("/", indexRoutes);
app.use("/posts", postRoutes);
app.use("/admin/posts", postsRoutes);
app.use("/admin/categories", categoryRoutes);
app.use("/admin/contacts", contactsRoutes);

app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'pug');


//List of routes printed on server start
function print(path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    console.log('%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'))
  }
}

function split(thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}

console.log('');
console.log('Routes:');
app._router.stack.forEach(print.bind(null, []))
console.log('');

module.exports = app
