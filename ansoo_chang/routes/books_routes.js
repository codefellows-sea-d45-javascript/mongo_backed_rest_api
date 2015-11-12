var express = require('express');
var bodyParser = require('body-parser');
var handleError = require(__dirname + '/../lib/handleServerError');

var Book = require(__dirname + '/../models/book');

// read
booksRouter.get('/books', function(req, res) {
  Book.find({}, function(err, data) {
    if (err)
      return handleError(err, res);
  });
});

// create
booksRouter.post('/books', bodyParser.json(), function(req, res) {
  var newBook = new Book(req.body);
  newBook.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

// update
booksRouter.put('/books/:id', bodyParser.json(), function(req, res) {
  var bookData = req.body;
  delete bookData._id;
  Book.update({_id: req.params.id}, bookData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'Success'});
  });
});

// delete
booksRouter.delete('/books/:id', function(req, res) {
  Book.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'Success'});
  });
});
