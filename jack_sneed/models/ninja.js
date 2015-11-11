var mongoose = require('mongoose')

  ,Schema = mongoose.Schema;

var ninjaSchema = Schema({
  name      : String,
  superPower: String,
  weapon    : String,
  food      : String,
  country   : String,
});

module.exports = mongoose.model('Ninja', ninjaSchema);
