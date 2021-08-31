var express = require("express");
var home = express.Router();

//home page for server
home.get("/", (res, req) => {
  req.render('index', {title:'express server'})
});


module.exports = home;
