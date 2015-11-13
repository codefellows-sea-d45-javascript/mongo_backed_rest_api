var mongoose = require('mongoose');
var express = require('express');
var app = express();
var morderorsRouter = require(__dirname + '/routes/morderors_routes.js');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/morderor_dev');

app.use('/api', morderorsRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening');
});
