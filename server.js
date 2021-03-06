// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
// var expressValidator = require('express-validator');
// var expressSession = require('express-session');
var logger = require('morgan');

// ----  For Demo purpose only ----//
var path = require('path');

// Set up express app and port
var app = express();
var PORT = process.env.PORT || 8080;

// Setting up socket.io for realtime data transfer
var http = require("http").Server(app);
var io = require("socket.io")(http);

// // Requiring models for syncing
// var db = require("./models");

// Set up Express app to handle data parsing
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Serving static files
app.use(express.static("./public"));

// Requiring controllers here and passing app
require("./controllers/controller.js")(app);
// tentative realtime updation 
require("./controllers/vote-controller.js")(app, io);

// Syncing sequelize models, then starting express app
db.sequelize.sync({force: false}).then(function() {
  // Listening on port
	http.listen(PORT, function() {
		console.log("listening on port " + PORT);
	});
});
