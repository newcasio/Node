//import express
var express = require("express");
//set app to running a instance of the express function,  this creates an Express application
var app = express();

// the 'app' object has methods/functions for routes, configuration, middleware regsitering, etc.
// 'get' method, path is '/', callback with request and response
app.get("/", (req, res) => {
  res.send("hello form express with arrow");
});

// express application list for port 3000
app.listen(3000, () => {
  console.log("listeing on port 3000");
});
