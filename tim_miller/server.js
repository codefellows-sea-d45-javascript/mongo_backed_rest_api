var mongoose = require('mongoose');
var express = require('express');
var officerRouter = require(__dirname + '/routes/officerroutes.js');
var felonRouter = require(__dirname + '/routes/felonroutes.js');
var bustedRouter = require(__dirname + '/routes/bustedroutes.js');
var chuckRouter = require(__dirname + '/routes/chuckroutes.js');
var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/officer_dev');

app.use(officerRouter, felonRouter, bustedRouter, chuckRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('BAD BOY, BAD BOYS. WHATCHA GONNA DO WHEN THEY COME FOR YOU');
});

