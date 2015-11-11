var express = require('express');
var bodyParser = require('body-parser');
var Player = require(__dirname + '/../models/player')

var handelError = require(__dirname + '/../lib/handleServerError');

var playerRouter = module.exports = exports = express.Router();

playerRouter.post('/player', bodyParser.json(), function(req, res) {
  var newPlayer = new Player(req.body);
  newBear.save(function(err, data) {
    if (err) return handelError(err, res);

    res.json(data);
  });
});
