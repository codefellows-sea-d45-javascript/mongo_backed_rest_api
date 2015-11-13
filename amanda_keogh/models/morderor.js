var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var morderorSchema = new mongoose.Schema({
  name: String,
  morders: {name: String, verb: String},
  morderedBy: {name: String, verb: String}
});

module.exports = exports = mongoose.model('Morderor', morderorSchema);
