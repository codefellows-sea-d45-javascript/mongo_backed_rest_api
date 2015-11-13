var express = require('express');
var mongoose = require('mongoose');
var app = express();
var messagesRouter = require(__dirname + '/routes/message_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/self_destruct');

app.use('/api', messagesRouter);

app.listen(process.env.PORT || 3000, function(){
  console.log("Server up. All systems go.")
});
