var mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({
  name: String,
  places: String,
  Duration: Number,
  description: String
});

module.exports = mongoose.model('Country', countrySchema);

var mongoose = require('mongoose');

