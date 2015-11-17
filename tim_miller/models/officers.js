var mongoose = require('mongoose');


var officerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  criminalsBusted: {type: Number, min: 0, default: 0}


});

module.exports = exports = mongoose.model('Officer', officerSchema);
