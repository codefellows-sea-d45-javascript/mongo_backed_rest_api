var express = require('express');
var bodyParser = require('body-parser');
var Felon = require(__dirname + '/../models/felons');
var error = require(__dirname + '/../lib/errorHandler.js');

var felonRouter = module.exports = exports = express.Router();


felonRouter.get('/felons', function(req, res) {
  Felon.find({}, function(err, data) {
    if (err) return error.default(err, res);

    res.json(data);
  });
});

felonRouter.post('/felons', bodyParser.json(), function(req, res) {
  var newFelon = new Felon(req.body);

  newFelon.save(function(err, data) {
    if(err) return error.require(err, res);

    res.json(data);
  });
});

felonRouter.put('/felons', bodyParser.json(), function(req, res) {

  var felonData = req.body;
  delete req.body._id;
  Felon.update({_id: felonData._id}, felonData, function(err) {
    if(err) return error.default(err, res);

    res.send('updated!');
  });
});

felonRouter.delete('/felons/:id', function(req, res) {

  Felon.remove({_id: req.params._id}, function(err) {
    if(err) return error.default(err, res);

    res.send('deleted!');
  });
});
