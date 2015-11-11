var mongoose = require('mongoose');
var express = require('express');
var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/mariner_player')

app.listen(process.env.PORT || 3000, function() {
  console.log('server running');
})
