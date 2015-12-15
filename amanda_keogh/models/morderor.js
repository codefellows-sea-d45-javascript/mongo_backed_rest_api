var mongoose = require('mongoose');
//var Schema = mongoose.Schema;          -- shouldn't need?

var morderorSchema = new mongoose.Schema({
  name: String,
  verb: String
});

module.exports = exports = mongoose.model('Morderor', morderorSchema);
