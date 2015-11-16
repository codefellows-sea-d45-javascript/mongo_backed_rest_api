var mongoose = require('mongoose');

var min = []

var playerBase = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: 'Please give a Last Name'},
  position: {type: String, default: '-'},
  number: {type: Number,  min: 0, max: 99},
  team: {type: String, default: 'free_agent'},
  bat: String,
  throwing: String,
});

module.exports = mongoose.model('Player', playerBase);
