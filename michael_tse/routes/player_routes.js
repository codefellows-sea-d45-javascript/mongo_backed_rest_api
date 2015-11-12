var express = require('express');
var bodyParser = require('body-parser');
var Player = require(__dirname + '/../models/player')
var handleError = require(__dirname + '/../lib/handleServerError');

var playerRouter = module.exports = exports = express.Router();

//get request to get players by team name(team name must start with upper case)
playerRouter.get('/player/:team', function(req, res) {
  Player.find({team: req.params.team.toString() }, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  })
})

playerRouter.post('/player', bodyParser.json(), function(req, res) {
  var newPlayer = new Player(req.body);
  newPlayer.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

playerRouter.put('/player/:id', bodyParser.json(), function(req, res) {
  var playerData = req.body;
  delete playerData._id;
  Player.update({_id: req.params.id.toString()}, playerData, function(err, data) {
    if (err) handleError(err, res);

    res.json({msg: 'update success!'});
  });
});

playerRouter.delete('/player/:id', function(req, res) {
  Player.remove({_id: req.params.id}, function(err) {
    if(err) return handleError(err, res);

    res.json({msg: 'delete success!'})
  })
})
