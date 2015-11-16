'use strict';

var mongoose = require('mongoose');
var express = require('express');
var app = express();
var sayingsRouter = require(__dirname + '/routes/sayings_routes');

mongoose.connect(process.env.MONGOLAB_URI ||
                'mongodb://localhost/sayings_es_dev');

app.use('/api', sayingsRouter);

app.use(function(req, res) {
  res.redirect(301, '/api');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server up');
});
