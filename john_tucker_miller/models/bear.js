var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bearSchema = new Schema({
  name: String,
  flavor: {type: String, default: 'grizzly'},
  fishPreference: {type: String, default: 'salmons'}
});

module.exports = mongoose.model('Bear', bearSchema);
