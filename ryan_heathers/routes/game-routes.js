var express = require('express');
var bodyParser = require('body-parser');
var Game = require(__dirname + '/../models/games');
var handleError = require(__dirname + '/../lib/handle-server-error');

var gameRouter = module.exports = exports = express.Router();

gameRouter.get('/games', function(req, res) {
  Game.find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

gameRouter.post('/games', bodyParser.json(), function(req, res) {
  var game = new Game(req.body);
  game.save(function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});
