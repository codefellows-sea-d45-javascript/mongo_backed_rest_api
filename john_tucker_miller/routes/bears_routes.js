var express = require('express');
var bodyParser = require('body-parser');
var Bear = require(__dirname + '/../models/bear');
var handleError = require(__dirname + '/../lib/handleServerError');

var bearsRouter = module.exports = exports = express.Router();

// Return a list of all bears and their properties when a get request is made to '/bears'
bearsRouter.get('/bears', function(req, res) {
  Bear.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

// When a post request is made to '/bears', add a bear to the database
// Use the body of the request to populate the new bear
bearsRouter.post('/bears', bodyParser.json(), function(req, res) {
  var newBear = new Bear(req.body);
  newBear.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

// Update an existing bear
bearsRouter.put('/bears/:id', bodyParser.json(), function(req, res) {
  var bearData = req.body;
  delete bearData._id;
  Bear.update({_id: req.params.id}, bearData, function(err, data) {
    if (err) return handleError(err, res);

    res.json({msg: 'success'});
  });
});

// Respond with information about bears
bearsRouter.get('/info', function(req, res) {
  res.send('Bears are mammals of the family Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia.');
});
