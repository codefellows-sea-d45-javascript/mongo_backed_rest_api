var mongoose = require('mongoose');

var morderorSchema = new mongoose.Schema({
  name: string,
  morders: {name: String, verb: String},
  morderedBy: {name: String, verb: String}
});

modules.exports = exports = mongoose.model('Morderor', morderorSchema);
