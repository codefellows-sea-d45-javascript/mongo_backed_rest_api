var express = require('express');
var bodyParser = require('body-parser');
var Morderor = require(__dirname + "/../models/morderor");
var errorHandler = require(__dirname + "/../lib/errorHandler.js");

var morderorRouter = exports = module.exports = express.Router();

morderorRouter.get('/morderors', function(req, res) {
  Morderor.find({}, function(err, data) {
    if (err) return res.status(500).json({msg: 'ERROR!!'});
    res.json(data);
  });
  console.log('get!');
});

morderorRouter.get('/morderors/:id', function(req, res) {
  Morderor.find({_id: req.params.id}, function(err, data) {
    if (err) return res.status(500).json({msg: 'ERROR!!'});
    res.json(data);
  });
  console.log('got!');
});

morderorRouter.post('/morderors', bodyParser.json(), function(req, res) {
  var newMorderor = new Morderor(req.body);
  newMorderor.save(function(err, data) {
    if (err) return res.status(500).json({msg: 'ERROR!!'});
    res.json(data);
  });
  console.log('post!');
});

morderorRouter.put('/morderors/:id', bodyParser.json(), function(req, res) {
  var data = req.body;
  Morderor.update({_id: req.params.id}, data, function(err) {
    if (err) return res.status(500).json({msg: 'ERROR!!'});
    res.json({msg: 'morderor updated!'});
  });
  console.log('put!');
});

morderorRouter.delete('/morderors/:id', function(req, res) {
  Morderor.remove({_id: req.params.id}, function(err) {
    if (err) return res.status(500).json({msg: 'ERROR!!'});
    res.json({msg: 'morderor mordered!'});
  });
  console.log('delete!');
});
