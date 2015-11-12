var mongoose = require('mongoose');
var currentYear = new Date().getFullYear();

var movieSchema = new mongoose.Schema({
  title: {type: String, required: true},
  year: {type: Number, min: 1890, max: currentYear},
  director: String,
  actors: [String]
});

var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
