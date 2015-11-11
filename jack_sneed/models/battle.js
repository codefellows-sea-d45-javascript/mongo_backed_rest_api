var mongoose = require('mongoose')

  ,Schema = mongoose.Schema;
var Ninja = require(__dirname + '/models/ninja');

var battleSchema = Schema({
  wins      : {type: Number, ref: 'Ninja'},
  losses    : {type: Number, ref: 'Ninja'},
  partyFouls: {type: Number, ref: 'Ninja'}
});

module.exports = mongoose.model('Battles', battleSchema);
