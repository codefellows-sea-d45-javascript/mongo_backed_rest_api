var mongoose = require('mongoose');

var parcelSchema = new mongoose.Schema({
  item: {type: String, default: 'mailing_packet'},
  size: String,
  weight: {type: Number, max: 10},
  location: {type: String, default: 'Seattle'}
});

module.exports = mongoose.model('Parcel', parcelSchema);

