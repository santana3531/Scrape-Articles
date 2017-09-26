/* MONGODB URI //// mongodb://heroku_rvsr1p7z:n0td00qb465vqu04b1kj4nejl2@ds147884.mlab.com:47884/heroku_rvsr1p7z*/


// REQUIRE the dependencies
var express = require('express');
var bodyParser = require('body-parser');
var expressHandlebars = require("express-handlebars");
var mongoose = require('mongoose');


// require the articles.js and review.js
var PORT = process.env.PORT || 3000;


//start express
var app = express();


// use the express router
var router = express.Router();

// REQUIRE route file 
require('./config/routes')(router);

// USE express to take public directory
app.use(express.static(__dirname + '/public'));


// Connect handlebars with the express app
app.engine('handlebars', expressHandlebars({
	defaultLayout: "main"
}));
app.set("show engine", "handlebars");

// USE bodyParser 
app.use(bodyParser.urlencoded({
	extended: false
}));

// USE router for all the requests
app.use(router);


// use the mongoDB db if deploying. if not use localhost
var db = process.env.MONGODB_URI || "mongodb://heroku_rvsr1p7z:n0td00qb465vqu04b1kj4nejl2@ds147884.mlab.com:47884/heroku_rvsr1p7z"

mongoose.connect(db, function(err) {
		if (err) { // console log it
		console.log(err);
	};
	// if successful login, log success message
	else {
		console.log("Mongoose on the loose, you're connected!");
	};
});


// listen on Port 3000
app.listen(PORT, function() {
	console.log("Listening on port: " + PORT);
});

/////////////////////////////////////////////