'use strict';

var mongoose = require('mongoose');

var tapirSchema = new mongoose.Schema({
  name: String,
  type: {type: String, default: 'Malayan'},
  diet: {type: String, default: 'veggies'},
  age: Number,
  weight: Number
});

module.exports = mongoose.model('Tapir', tapirSchema);
