var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  title: String,
  author: String,
});

module.exports = mongoose.model('Book', bookSchema);


