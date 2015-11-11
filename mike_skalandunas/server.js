'use strict';

var mongoose = require('mongoose');
var express = require('express');
var app = express();
var tapirsRouter = require(__dirname + '/routes/tapir_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/tapir_stream_dev');

app.use('/api', tapirsRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('It\'s tapir time.');
});
