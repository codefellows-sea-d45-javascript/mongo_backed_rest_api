var express = require('express');
var bodyParser = require('body-parser');
var Parcel = require(__dirname + '/../models/parcel.js');
var handleError = require(__dirname + '/../lib/handleServerError.js');

var parcelsRouter = module.exports = exports = express.Router();

parcelsRouter.get('/parcels', function(req, res) {
  Parcel.find({},
  function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

parcelsRouter.post('/parcels', bodyParser(), function(req,res) {
  var newParcel = new Parcel(req.body);
  newParcel.save(function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

parcelsRouter.put('/parcels/:id', bodyParser.json(), function(req, res) {
  var parcelData = req.body;
  delete parcelData._id;
  Parcel.update({_id: req.params.id}, parcelData, function(err) {
    if (err) return handleError(err, res);
    res.json({msg: 'success!'});
  });
});

parcelsRouter.delete('/parcels/:id', function(req, res) {
  Parcel.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);
    res.json({msg: 'success!'});
  });
});
