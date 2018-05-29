require('dotenv').config();
const uuidv4 = require('uuid/v4');
let fs = require('fs');
// let file = fs.readFileSync(__dirname + '/events.json');
// let obj = JSON.parse(file);


const express = require('express');
const app = express()
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  console.log("route /");
  let confirmedUsers = []
  let arrayOfFiles = fs.readdirSync('./users/');
  if (arrayOfFiles.length > 0) {
    arrayOfFiles.forEach(file => {
      if(!file.includes(".json"))
        return;
      let readFile = fs.readFileSync(`./users/${file}`)
      let user = JSON.parse(readFile);
      if (user.status == "confirmed") {
        confirmedUsers.push(user)
      }
    });
  }
  res.render('index', {
    confirmedUsers: confirmedUsers
  })
})

app.get('/admin', (req, res) => {
  console.log("route /admin");
  let confirmedUsers = []
  let unconfirmedUsers = []
  let arrayOfFiles = fs.readdirSync('./users/');
  if (arrayOfFiles.length > 0) {
    arrayOfFiles.forEach(file => {
      if(!file.includes(".json"))
        return;
      let readFile = fs.readFileSync(`./users/${file}`)
      let user = JSON.parse(readFile);
      if (user.status == "confirmed") {
        confirmedUsers.push(user)
      } else {
        unconfirmedUsers.push(user)

      }
    });
  }
  res.render('admin', {
    confirmedUsers: confirmedUsers,
    unconfirmedUsers: unconfirmedUsers
  })
})
app.get('/register', (req, res) => {
  res.render('register', {})
})

// app.get('/api/events', (req, res) => {
//     console.log("route /events");
//     let obj = JSON.parse(file);
//     res.send(obj)
// })
//
// app.get('/api/events/random', (req, res) => {
//     console.log("route /api/events/random");
//
//     res.send(obj[Math.floor(Math.random() * (obj.length - 0 + 1)) + 0])
// })
//
// app.get('/api/events/:id', (req, res) => {
//     console.log("route /:id");
//     res.send(obj.filter(i => i._id["$oid"] == req.params.id))
// })


app.get('/create', (req, res) => {
  let uuid = uuidv4();
  let obj = {
    uuid: uuid,
    email: req.query.email,
    pw: req.query.pw,
    status: "unconfirmed",
    session: req.query.staysignedin ? true : false
  }
  console.log("route /create");

  fs.writeFile(`./users/${uuid}.json`, JSON.stringify(obj), function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
    res.redirect("/register");
  });
})

app.get('/users/verify/:token', (req, res) => {
  console.log(req.params.token)
  //open your files folder fs.readDir
  fs.readFile(`./users/${req.params.token}.json`, (err, theFile) => {
    if (err) console.log('Error', err);
    else {
      let file = JSON.parse(theFile)
      //set that document status to confirmed
      if (file.uuid === req.params.token) {
        console.log("current file uuid:", file.uuid)
        file.status = "confirmed";
        //write file back
        fs.writeFile(`./users/${req.params.token}.json`, JSON.stringify(file), (err) => {
          if (err) {
            return console.log(err);
          }

          console.log("The email was confirmed!");
          //redirect to /
          res.redirect("/admin");
        });
      }
    };
  });
});

app.get('*', (req, res) => {
  console.log("route /fallback");
  res.send("route not found")
})

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${process.env.PORT}!`))
