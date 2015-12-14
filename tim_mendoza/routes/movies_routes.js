var express = require('express');
var moviesRouter = express.Router();
var bodyParser = require('body-parser');
var Movie = require(__dirname + '/../models/movie');

var handleError = function(err, res) {
  console.log(err);
  res.status(500).send('server error');
};

moviesRouter.get('/movies', function(req, res) {
  Movie.find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

moviesRouter.post('/movies', bodyParser.json(), function(req, res) {
  var newMovie = new Movie(req.body);
  newMovie.save(function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

moviesRouter.put('/movies/:id', bodyParser.json(), function(req, res) {
  var movieData = req.body;
  delete movieData._id;
  Movie.update({_id: req.params.id}, movieData, function(err, data) {
    if (err) return handleError(err, res);
    res.send('update successful');
  });
});

moviesRouter.delete('/movies/:id', bodyParser.json(), function(req, res) {
  Movie.remove({_id: req.params.id}, function(err, data) {
    if (err) return handleError(err, res);
    res.send('delete successful');
  });
});

module.exports = moviesRouter;
