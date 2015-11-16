var express = require('express');
var bodyParser = require('body-parser');
var Ninja = require(__dirname + '/../models/ninja');
var Battle = require(__dirname + '/../models/battle');
var handleServerError = require(__dirname + '/../lib/handleServerError');

var ninjaRouter = module.exports = exports = express.Router();
var favicon = new Ninja({name: 'Favicon'});

favicon.save(function (err) {
  if (err) return handleServerError(err);

  var battle1 = new Battle({
    name: "Once upon a roof walk.",
    wins: 11
  });

  battle1.save(function (err) {
    if (err) return handleServerError(err);
  });
});

Battle
.findOne({ name: 'Once upon a roof walk.' })
.populate('wins', 11)
.exec(function (err, battle) {
  if (err) return handleServeError(err);
  console.log('It worked');
});

ninjaRouter.get('/ninja', function(req, res) {
  Ninja.find({}, function(err, data) {
    if (err) return handleServerError(err, res);

    res.json(data);
  });
});

ninjaRouter.post('/ninja', bodyParser.json(), function(req, res) {
  var newNinja = new Ninja(req.body);
  newNinja.save(function(err, data) {
    if (err) return handleServerError(err, res);

    res.json(data);
  });
});

ninjaRouter.put('/ninja/:id', bodyParser.json(), function(req, res) {
  var ninjaData = req.body;
  delete ninjaData._id;
  Ninja.update({_id: req.params.id}, ninjaData, function(err) {
    if (err) return handleServerError(err, res);

    res.json({msg: 'Ninja out!'});
  });
});

ninjaRouter.get('/battle', function(req, res) {
  Battle.find({}, function(err, data) {
    if (err) return handleServerError(err, res);

    res.json(data);
  });
});

ninjaRouter.post('/battle', bodyParser.json(), function(req, res) {
  var newBattle = new Battle(req.body);
  newBattle.save(function(err, data) {
    if (err) return handleServerError(err, res);

    res.json(data);
  });
});

ninjaRouter.put('/battle/:id', bodyParser.json(), function(req, res) {
  var battleData = req.body;
  delete battleData._id;
  Battle.update({_id: req.params.id}, battleData, function(err) {
    if (err) return handleServerError(err, res);

    res.json({msg: 'Ninja down!'});
  });
});
