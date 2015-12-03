var mongoose = require('mongoose');
var express = require('express');
var app = express();
var booksRouter = require(__dirname + '/routes/books_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongod://localhost/book_stream_dev');

app.use(express.static(__dirname + '/build'));

app.use('/api', booksRouter);

app.listen(process.env.PORT | 3000, function() {
  console.log('server up');
});
