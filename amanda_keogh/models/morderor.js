var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var morderorSchema = new mongoose.Schema({
  name: String,
  verb: String
});

module.exports = exports = mongoose.model('Morderor', morderorSchema);
