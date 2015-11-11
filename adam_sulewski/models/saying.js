var mongoose = require('mongoose');

var sayingSchema = new mongoose.Schema({
  saying: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'Spanish'
  },
  translation: String,
  enEquiv: String,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Saying', sayingSchema);
