var mongoose = require('mongoose');
var Ninja = require('./ninja');

var battleSchema = new mongoose.Schema({
  name      : String,
  wins      : {type: Number, ref: 'Ninja'},
  losses    : {type: Number, ref: 'Ninja'},
  partyFouls: {type: Number, ref: 'Ninja'}
});

module.exports = mongoose.model('Battles', battleSchema);
