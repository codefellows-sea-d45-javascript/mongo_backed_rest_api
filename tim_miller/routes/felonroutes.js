var express = require('express');
var bodyParser = require('body-parser');
var Felon = require(__dirname + '/../models/felons');
var error = require(__dirname + '/../lib/errorHandler.js');
var eatAuth = require(__dirname + '/../lib/eat_auth.js');

var felonRouter = module.exports = exports = express.Router();


felonRouter.get('/felons', function(req, res) {
  Felon.find({}, function(err, data) {
    if (err) return error.default(err, res);

    res.json(data);
  });
});

felonRouter.post('/felons', bodyParser.json(), /*eatAuth,*/ function(req, res) {
  var newFelon = new Felon(req.body);

  newFelon.save(function(err, data) {
    if(err) return error.require(err, res);

    res.json(data);
  });
});

felonRouter.put('/felons/:id', bodyParser.json(), /*eatAuth,*/ function(req, res) {

  var felonData = req.body;
  delete felonData._id;
  Felon.update({_id: req.params.id}, felonData, function(err) {
    if(err) return error.default(err, res);

    res.send('updated!');
  });
});

felonRouter.delete('/felons/:id', bodyParser.json(), /*eatAuth,*/ function(req, res) {

  Felon.remove({_id: req.params.id}, function(err) {
    if(err) return error.default(err, res);

    res.send('deleted!');
  });
});
