var mongoose = require('mongoose');

var boardGameSchema = new mongoose.Schema({
  name: String,
  genre: String,
  number_of_players: { type: Number, min: 2, max: 12 }
});

module.exports = mongoose.model('Board Game', boardGameSchema);
