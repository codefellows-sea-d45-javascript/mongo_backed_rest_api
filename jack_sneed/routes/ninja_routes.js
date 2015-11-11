var express = require('express');
var bodyParser = require('body-parser');
var Ninja = require(__dirname + '/../models/ninja');
var Battle = require(__dirname + '/../models/battle');
var handleServerError = require(__dirname + '/../lib/handleServerError');

var ninjaRouter = module.exports = exports = express.Router();

ninjaRouter.get('/ninja', function(req, res) {
  Ninja.find({}, function(err, data) {
    if (err) return handleServerError(err, res);

    res.json(data);
  });
});

ninjaRouter.post('/ninja', function(req, res) {
  var newNinja = new Ninja(req.body);
  newNinja.save(function(err, data) {
    if (err) return handleServerError(err, res);

    res.json(data);
  });
});

ninjaRouter.put('/ninja/:id', function(req, res) {
  var ninjaData = req.body;
  delete ninjaData._id;
  Ninja.update({_id: req.params.id}, ninjaData, function(err) {
    if (err) return handleServerError(err, res);

    res.json({msg: 'Ninja outta here!'});
  });
});

ninjaRouter.get('/battle', function(req, res) {
  Battle.find({}, function(err, data) {
    if (err) return handleServerError(err, res);

    res.json(data);
  });
});

ninjaRouter.post('/battle', function(req, res) {
  var newBattle = new Battle(req.body);
  newBattle.save(function(err, data) {
    if (err) return handleServerError(err, res);

    res.json(data);
  });
});

ninjaRouter.put('/battle/:id', function(req, res) {
  var battleData = req.body;
  delete battleData._id;
  Battle.update({_id: req.params.id}, battleData, function(err) {
    if (err) return handleServerError(err, res);

    res.json({msg: 'Done!'});
  });
});
