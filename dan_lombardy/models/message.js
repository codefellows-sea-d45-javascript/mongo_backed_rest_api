"use strict";

var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  oneWordTitle: {type: String, required: "Provide a one word title for your message"},
  secretToRead: {type: String, required: "Please set a secret to read"},
  priority: {type: Number, required:"Please provide a priority of 1-5, with 1 being the highest prioprity"},
  views: {type:Number, default: 0},
  destructMessage: {type: String, default: "You only get to read this 3 times!"}

});

module.exports = mongoose.model('Message', messageSchema);
