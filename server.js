var { url, mongopath } = require("./helper.js");
const express = require("express");
const app = express();
var path = require("path");
var bodyParser = require("body-parser");

// configure app to use bodyParser()
// this will let us get the data from a POST

//app.use(express.static('./css'));
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);
app.use("/css", express.static(path.join(__dirname, "views/css/")));
app.use(
  "/popper",
  express.static(path.join(__dirname, "node_modules/popper.js/dist/umd/"))
);
app.use(
  "/jquery",
  express.static(path.join(__dirname, "node_modules/jquery/dist/"))
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//TODO get realy database records instead of this fake data
const courses = [
  { name: "Orientation course", type: "orientation" },
  { name: "One year course", type: "oneyear" },
  { name: "Coaching course", type: "coaching" }
];
app.locals.courses = courses;

app.use(function(req, res, next) {
  //Logger
  console.log(req.method, req.headers.host + req.url);
  next();
});
app.use(function(req, res, next) {
  if (req.query.alert === "created") {
    res.locals.message = "Post created successfully!";
    res.locals.color = "alert-success";
  } else if (req.query.alert === "deleted") {
    res.locals.message = "Post deleted successfully!";
    res.locals.color = "alert-success";
  } else if (req.query.alert === "updated") {
    res.locals.message = "Post updated successfully!";
    res.locals.color = "alert-success";
  }
  next();
});
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

var mongoose = require("mongoose");
mongoose.connect(mongopath);

let indexRoutes = require('./routes/index');
let postsRoutes = require('./routes/posts');
let eventsRoutes = require('./routes/events');
let coursesRoutes = require('./routes/courses');

let categoryAdminRoutes = require("./routes/admin/categories");
let postsAdminRoutes = require("./routes/admin/posts");
let contactsAdminRoutes = require("./routes/admin/contacts");

app.use("/", indexRoutes);
app.use("/posts", postsRoutes);
app.use("/events", eventsRoutes);
app.use("/courses", coursesRoutes);
app.use("/admin/posts", postsAdminRoutes);
app.use("/admin/categories", categoryAdminRoutes);
app.use("/admin/contacts", contactsAdminRoutes);

app.set("views", path.join(__dirname, "views/"));
app.set("view engine", "pug");

//List of routes printed on server start
function print(path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(
      print.bind(null, path.concat(split(layer.route.path)))
    );
  } else if (layer.name === "router" && layer.handle.stack) {
    layer.handle.stack.forEach(
      print.bind(null, path.concat(split(layer.regexp)))
    );
  } else if (layer.method) {
    console.log(
      "%s /%s",
      layer.method.toUpperCase(),
      path
        .concat(split(layer.regexp))
        .filter(Boolean)
        .join("/")
    );
  }
}

function split(thing) {
  if (typeof thing === "string") {
    return thing.split("/");
  } else if (thing.fast_slash) {
    return "";
  } else {
    var match = thing
      .toString()
      .replace("\\/?", "")
      .replace("(?=\\/|$)", "$")
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
    return match
      ? match[1].replace(/\\(.)/g, "$1").split("/")
      : "<complex:" + thing.toString() + ">";
  }
}

console.log("");
console.log("Routes:");
app._router.stack.forEach(print.bind(null, []));
console.log("");

module.exports = app;
