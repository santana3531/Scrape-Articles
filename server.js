/* MONGODB URI:  */


// require the dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlesbars = require("express-handlebars");
var bodyParser = require("body-parser");

// Set up ports for host designated and/or localhost:3000
var PORT = process.env.PORT || 3000;


var app = express();

// set up express router
var router = express.Router();

// require our routes file
require("./config/routes")(router);


// use public folder for static directory
app.use(express.static(__dirname + "/public"));


// handlebars --> express app
app.engine("handlebars", expressHandlesbars({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");


// use bodyParser
app.use(bodyParser.urlencoded({
	extended: false
}));

// use router
app.use(router);

// use deployed database or use local mongo database
var db = process.env.MONGODB_URI || 


// connect mongoose to database
mongoose.connect(db, function(err) {
	if (err) {
		console.log(err);
	}
	else {
		console.log("Mongoose is connected.")
	}
});


// listen on port
app.listen(PORT, function() {
	console.log("Listening on port:" + PORT);
});