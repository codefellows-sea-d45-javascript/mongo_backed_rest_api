var mongoose = require('mongoose');

var felonSchema = new mongoose.Schema({
  name: {type: String, required: true},
  crime: String,
  inJail: {type: Boolean, default: false}
});

module.exports = exports = mongoose.model('Felon', felonSchema);
