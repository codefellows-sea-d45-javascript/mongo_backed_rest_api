var mongoose = require('mongoose');
var express = require('express');
var app = express();
var ninjaRouter = require(__dirname + '/routes/ninja_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/ninja_stream_dev');

app.use('/api', ninjaRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server up');
});
