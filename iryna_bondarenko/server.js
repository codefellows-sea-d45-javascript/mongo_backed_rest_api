var mongoose = require('mongoose');
var express = require('express');
var app = express();
var countryRouter = require(__dirname + '/routes/countries');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/countries');

app.use('/api', countryRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server up');
});
