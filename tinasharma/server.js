var mongoose = require('mongoose');
var express = require('express');
var app = express();
var parcelsRouter = require(__dirname + '/routes/parcels_routes.js');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/parcel_stream_dev');

app.use('/api', parcelsRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server is running');
});
