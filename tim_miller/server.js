var mongoose = require('mongoose');
var express = require('express');
var officerRouter = require(__dirname + '/routes/officerroutes.js');
var felonRouter = require(__dirname + '/routes/felonroutes.js');
var bustedRouter = require(__dirname + '/routes/bustedroutes.js');
var chuckRouter = require(__dirname + '/routes/chuckroutes.js');
var authRouter = require(__dirname + '/routes/auth_routes.js');
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || '123451234512345';
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/officer_dev');

app.use('/api', officerRouter);
app.use('/api', felonRouter);
app.use('/api', bustedRouter);
app.use('/api', chuckRouter);
app.use('/api', authRouter);
app.use(express.static(__dirname + '/build'));

app.use(function(req, res) {
  res.status(404).send('could not find file');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('BAD BOY, BAD BOYS. WHATCHA GONNA DO WHEN THEY COME FOR YOU');
});

