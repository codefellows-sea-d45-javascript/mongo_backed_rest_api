var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  title: String,
  published: {type: Number, min: 0000, max: 2015},
  author: String,
  genre: String
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
