var mongoose = require('mongoose');

var ninjaSchema = new mongoose.Schema({
  name      : String,
  superPower: {type: String, default: 'invisibility'},
  weapon    : {type: String, default: 'brass knuckles'},
  food      : {type: String, default: 'will power'},
  country   : {type: String, default: 'Ninjland'}
});

module.exports = mongoose.model('Ninja', ninjaSchema);
