"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var Message = require(__dirname + '/../models/message');

var messagesRouter = module.exports = exports = express.Router();

messagesRouter.get('/messages', function(req, res){
  Message.find({}, function(err, data){
    if(err) return function(err, res){
      console.log("There was a connection error of " + err);
      res.status(500).json({errmsg: "There was a connection error"})
    };
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
  Message.find({oneWordTitle: title}, function(err, data){
    if(err) return function(err, res){
      console.log("There was a connection error of " + err);
      res.status(500).json({errmsg: "There was a connection error"})
    };

    if(data.length === 0){
      console.log("I am firing");
      console.log("Client tried to get an object that doesnt exist");
      return res.status(404).json({errmsg: "That message does not exist"});

    }

    var alert = "a self destruct count for the client";
    var adder = data[0].views + 1;

    if(data[0].views >= 3){
      console.log("Message with title " + data[0].oneWordTitle + " self destructed!");
      data[0].destructMessage = "BOOM! Your message self-destructed!";
      Message.remove({oneWordTitle: title}, function(err){
        if(err) return function(err, res){
          console.log("There was a connection error of " + err);
          res.status(500).json({errmsg: "There was a connection error"})
        };
        console.log("Message was deleted from database.");

        res.json(data);

      });
    }

    if(data[0].views === 2){

      console.log("Message has one view left");
      alert = "If you GET this message again it will self destruct!";
      Message.findOneAndUpdate({oneWordTitle: title},{$set:{destructMessage: alert, views:adder}}, {new:true}, function(err, doc){
        if(err) return function(err, res){
          console.log("There was a connection error of " + err);
          res.status(500).json({errmsg: "There was a connection error"})
        };

          console.log("View 3  should be" + doc);
          res.json(doc);
          console.log("Saved view3 back to database");
      });
    }

    if(data[0].views === 1){
      alert = "You can GET this message 2 more time and it self destructs!";
      console.log("Message has one view left");
      Message.findOneAndUpdate({oneWordTitle: title},{$set:{destructMessage: alert, views:adder}},{new:true}, function(err, doc){
        if(err) return function(err, res){
          console.log("There was a connection error of " + err);
          res.status(500).json({errmsg: "There was a connection error"})
        };

          console.log("View 2 should be" + doc);
          res.json(doc);
          console.log("Saved view2 back to database");
      });
    }

    if(data[0].views === 0){
      alert = "You can GET this message 3 more times and it self destructs!";
      data[0].destructMessage = alert;
      console.log("Message has two views left");

      Message.findOneAndUpdate({oneWordTitle: title},{$set:{destructMessage: alert, views:adder}},{new:true}, function(err, doc){
        if(err) return function(err, res){
          console.log("There was a connection error of " + err);
          res.status(500).json({errmsg: "There was a connection error"})
        };

          console.log("View 1 should be" + doc);
          res.json(doc);
          console.log("Saved view1 back to database");
      });
    }




  });








});

messagesRouter.post('/messages', bodyParser.json(), function(req, res){
  var newMessage = new Message(req.body);
  console.log("made it this far");
  newMessage.save(function(err, data){
    if(err) return function(err, res){
      console.log("There was a connection error of " + err);
      res.status(500).json({errmsg: "There was a connection error"})
    };

    res.json({msg: "It posted successfully!"});
  });
});
