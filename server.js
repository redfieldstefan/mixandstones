'use strict';

var express = require('express'),
	http = require('http'),
	bodyparser = require('body-parser'),
	mongoose = require('mongoose'),
	app = express(),
	port,
	server;

// Init
app.use(bodyparser.json());
require('./cocktailRouter')(app);
server = http.createServer(app);

// Set Mongo URLs
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_URL || 'mongodb://localhost/cocktails');

// Specify the static directory
app.use(express.static(__dirname + (process.env.STATIC_DIR || '/dist')));

port = process.env.PORT || 3000;

server.listen(port, function() {
	console.log('Lookin legit on port %d', port);
});

exports.port = port;