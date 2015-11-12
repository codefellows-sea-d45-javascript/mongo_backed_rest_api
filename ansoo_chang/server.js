var mongoose = require('mongoose');
var express = require('express');
var  booksRouter = require(__dirname, '/routes/books_routes');

var app = express();

//mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/book_dev');

//app.use('/api', booksRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('Server up on localhost 3000')
});

// test router
app.get('/', function(req, res) {
  res.send("Hello world!");
});
