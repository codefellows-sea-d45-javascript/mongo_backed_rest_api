var express = require('express');
var bodyParser = require('body-parser');
var Saying = require(__dirname + '/../models/saying');
var handleError = require(__dirname + '/../lib/handleError');

var sayingsRouter = module.exports = exports = express.Router();

sayingsRouter.get('/sayings', function(req, res) {
  Saying.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

sayingsRouter.post('/sayings', bodyParser.json(), function(req, res) {
  var newSaying = new Saying(req.body);
  newSaying.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

sayingsRouter.put('/sayings/:id', bodyParser.json(), function(req, res) {
  var sayingData = req.body;
  delete sayingData._id;
  Saying.update({_id: req.params.id}, sayingData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

sayingsRouter.delete('/sayings/:id', function(req, res) {
  Saying.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});
