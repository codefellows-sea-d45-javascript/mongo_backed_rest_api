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

morderorRouter.post('/morderors', bodyParser.json(), function(req, res) {
  var newMorderor = new Morderor(req.body);
  newMorderor.save(function(err, data) {
    if (err) return res.status(500).json({msg: 'ERROR!!'});
    res.json(data);
  });
  console.log('post!');
});

morderorRouter.put('/morderors/:name', bodyParser.json(), function(req, res) {
  var data = req.body;
  Morderor.update({name: req.params.name}, data, function(err) {
    if (err) return res.status(500).json({msg: 'ERROR!!'});
    res.json({msg: 'morderor updated!'});
  });
  console.log('put!');
});

morderorRouter.delete('/morderors/:name', function(req, res) {
  Morderor.remove({name: req.params.name}, function(err) {
    if (err) return res.status(500).json({msg: 'ERROR!!'});
    res.json({msg: 'morderor mordered!'});
  });
  console.log('delete!');
});

// Find "morders" value of name, delete that morderor
morderorRouter.all('/mordermatch/:name', function() {
  Morderor.find({name: req.params.name}, function(err, data) {
    res.json(data);
  });
  res.json({msg: "MORDERED!"});
});
