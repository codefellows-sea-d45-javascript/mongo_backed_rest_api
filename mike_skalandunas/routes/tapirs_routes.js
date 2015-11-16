'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var Tapir = require(__dirname + '/../models/tapir');
var handleError = require(__dirname + '/../lib/handleServerError');
var currentTime = require(__dirname + '/../lib/date.js');

var tapirsRouter = module.exports = exports = express.Router();

tapirsRouter.get('/tapirs', function(req, res) {
  Tapir.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

tapirsRouter.post('/tapirs', bodyParser.json(), function(req, res) {
  var newTapir = new Tapir(req.body);
  newTapir.save(function(err, data) {
    if (err) return handleError(err, res);

    currentTime();
    res.json(data);
  });
});
