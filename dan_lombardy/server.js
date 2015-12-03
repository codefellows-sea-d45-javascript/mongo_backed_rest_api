var mongoose = require('mongoose');
var express = require('express');
var app = express();
var messagesRouter = require(__dirname + '/routes/message_routes');
var fs = require('fs');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/self_destruct');

app.use(express.static(__dirname + '/build'));

app.use('/api', messagesRouter);

app.listen(process.env.PORT || 3000, function(){
  console.log("Server up. All systems go.")
});
