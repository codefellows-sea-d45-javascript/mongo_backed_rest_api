var mongoose = require('mongoose');
var app = require('express')();
var gameRouter = require(__dirname + '/routes/game-routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/boardgames_dev');

app.use('/api', gameRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running');
});
