// const mymodule = require('./mymodule')
//
// const numbersToAdd = [ 3, 4, 10, 2 ]
//
// const result = mymodule.bla(numbersToAdd)
// console.log(result)
//
//
//
//
var fs = require('fs');







// var obj = JSON.parse(fs.readFileSync('./out.json', 'utf8'));



// obj = obj.filter(o => o.aqm.r3000['$numberInt'] > 70)
// var string = ""
// string += "id,name,time\n"
// obj.map(i => {
//   string += i._id.$oid + ", " + i.aqm.r3000['$numberInt'] + ", " + i.gps.system_time + "\n"
// })
// console.log(string);
// // node index.js > bla.csv
//
//
//
//
//
//
//
//
//
// fs.writeFile("./bla.csv", string, function(err) {
//   if(err) {
//     return console.log(err);
//   }
//
//   console.log("The file was saved!");
// });




// var myReadStream = fs.createReadStream(__dirname + "/out.json", "utf8")
// var myWriteStream = fs.createWriteStream(__dirname + "/out.txt")
// myReadStream.on('data', (chunk) => {
//   console.log("new chunk");
//   myWriteStream.write(chunk)
// })

// var http = require("http");
//
// http.createServer(function(request, response) {
//   // response.setHeader('Content-Type', 'text/html');
//   const { headers, method, url } = request;
//   console.log(method)
//   console.log(url);
//   console.log(headers)
//   response.statusCode = 200;
//   response.setHeader('Content-Type', 'application/json');
//
//   const body = [{name: "Tommy"}, {name: "Alice"}]
//   const responseBody = { headers, method, url, body };
//   response.write(JSON.stringify(responseBody));
//
//
//
//   // response.writeHead(201, {"Content-Type": "text/html"});
//   // response.write("Hello World");
//
//   response.end();
// }).listen(8888);
//







//const express = require('express');
//const router = express.Router();
//router.get('/reverse', (req, res) => {
  //console.log(req.query.username);
  //// if(req.params)
  //// const changedParams = {name: [...req.params.name].reverse().join(""), age: req.params.id * 5}
  //// res.json(changedParams);
  //if(req.query.username === "tommy"){
    //res.render('error', {status: "Wrong username"})
  //} else {
    //res.render('index')
  //}
//});
