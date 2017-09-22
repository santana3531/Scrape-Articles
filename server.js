/* MONGODB URI //// mongodb://heroku_rvsr1p7z:n0td00qb465vqu04b1kj4nejl2@ds147884.mlab.com:47884/heroku_rvsr1p7z*/


// Depencies
var express = require('express');
var cheerio = require('cheerio');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');

// require the articles.js and review.js
var Article = require('./models/Article.js');
var Reviw = require('./models/Review.js');

// use mongoose promises
mongoose.Promise = Promise;

//start express
var app = express();

// use express to ake public dir and body parser in the app
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extebded: false}));

// set up database with URI key from the top.
mongoose.connect("mongodb://heroku_rvsr1p7z:n0td00qb465vqu04b1kj4nejl2@ds147884.mlab.com:47884/heroku_rvsr1p7z");

var promise = mongoose.connect("mongodb://localhost/scraped", {
	useMongoClient: true,
});


promise.then(function(db) {
	var db = mongoose.connection;
	db.on("err", function(err) {
		console.log("Database error", err);
	});
	// if successful login, log success message
	db.once("open", function() {
		console.log("Mongoose on the loose, you're connected!");
	});
});


