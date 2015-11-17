var mongoose = require('mongoose');
var express = require('express');
var app = express();

// Require our express router containing the routes for our bear database
var bearsRouter = require(__dirname + '/routes/bears_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/bear_stream_dev');

// Use our bears router on every request to /api
app.use('/api', bearsRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server is up dude');
})
