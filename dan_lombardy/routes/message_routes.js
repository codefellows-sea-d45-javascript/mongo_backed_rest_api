"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var Message = require(__dirname + '/../models/message');
var updateDBSendClient = require(__dirname + '/../lib/updateDoc.js');
var errorHandler = require(__dirname + '/../lib/errorHandler');

var messagesRouter = module.exports = exports = express.Router();

messagesRouter.get('/messages', function(req, res){
  Message.find({}, function(err, data){
    errorHandler(err, res);
    var titles =[];
    for(var i = 0; i < data.length; i++)
    {
      titles[i] = data[i]["oneWordTitle"];
    }
    console.log(titles);
    res.json(titles);
  });

});

messagesRouter.get('/messages/*', function(req, res){
  var path = req.path;
  var title = path.slice(10);
    var alert = "a self destruct count for the client";

  Message.find({oneWordTitle: title}, function(err, data){
    errorHandler(err, res);

    var adder = 0;

    if(data.length === 0){
      console.log("I am firing");
      console.log("Client tried to get an object that doesnt exist");
      return res.status(404).json({errmsg: "That message does not exist"});
    }

    if(data[0].views >= 3){
      console.log("Message with title " + data[0].oneWordTitle + " self destructed!");
      data[0].destructMessage = "BOOM! Your message self-destructed!";
      data[0].views = data[0].views +1;

      Message.remove({oneWordTitle: title}, function(err){
        errorHandler(err, res);

        console.log("Message was deleted from database.");

        res.json(data);
      });
    }

    if(data[0].views === 2){
      alert = "If you GET this message again it will self destruct!";
      console.log("Message has one view left");

      updateDBSendClient({oneWordTitle: title},{$set:{destructMessage: alert, views:adder}}, res);
    }

    if(data[0].views === 1){
      alert = "You can GET this message 2 more time and it self destructs!";
      console.log("Message has two views left");

      updateDBSendClient({oneWordTitle: title},{$set:{destructMessage: alert, views:adder}}, res);
    }

    if(data[0].views === 0){
      alert = "You can GET this message 3 more times and it self destructs!";
      data[0].destructMessage = alert;
      console.log("Message has three views left");

      updateDBSendClient({oneWordTitle: title},{$set:{destructMessage: alert, views:adder}}, res);
    }
  });
});

messagesRouter.post('/messages', bodyParser.json(), function(req, res){
  var newMessage = new Message(req.body);
  console.log("made it this far");
  newMessage.save(function(err, data){
    errorHandler(err, res);

    res.json({msg: "It posted successfully!"});
  });
});
