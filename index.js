require('dotenv').config({path: __dirname + '/.env'});

const express = require('express');
const app = express()
var path = require('path');
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.locals.domain = process.env.DOMAIN || "/";
  console.log(process.env.DOMAIN);
  if(req.query.alert === "created"){
    res.locals.message = "Post created successfully!"
    res.locals.color = "alert-success"
  }else if(req.query.alert === "deleted"){
    res.locals.message = "Post deleted successfully!"
    res.locals.color = "alert-success"
  }else if(req.query.alert === "updated"){
    res.locals.message = "Post updated successfully!"
    res.locals.color = "alert-success"
  }
  next();
})
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURL);

let postRoutes = require('./routes/posts')
let indexRoutes = require('./routes/index')

app.use("/posts", postRoutes)
app.use("/", indexRoutes)
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'pug')

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
