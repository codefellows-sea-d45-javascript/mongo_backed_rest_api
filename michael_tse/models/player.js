var mongoose = require('mongoose');

var playerBase = new mongoose.Schema({
  firstName: String,
  lastName: String,
  position: {type: String, default: '-'},
  number: Number,
  bat: String,
  throwing: String,
});

module.exports = mongoose.model('Player', playerBase);
