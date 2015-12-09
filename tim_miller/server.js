var mongoose = require('mongoose');
var express = require('express');
var fs = require('fs');
var officerRouter = require(__dirname + '/routes/officerroutes.js');
var felonRouter = require(__dirname + '/routes/felonroutes.js');
var bustedRouter = require(__dirname + '/routes/bustedroutes.js');
var chuckRouter = require(__dirname + '/routes/chuckroutes.js');
var authRouter = require(__dirname + '/routes/auth_routes.js');
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || '123451234512345';
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/officer_dev');

app.use(officerRouter, felonRouter, bustedRouter, chuckRouter, authRouter);

app.get('/:filename', function(req, res, next) {
  fs.stat(__dirname + '/build/' + req.params.filename, function(err, stats) {
    if (err) {console.log(err);
      return next();
    }

    if (!stats.isFile()) return next();

    var file = fs.createReadStream(__dirname + '/build/' + req.params.filename);
    file.pipe(res);
  });
});

app.use(function(req, res) {
  res.status(404).send('could not find file');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('BAD BOY, BAD BOYS. WHATCHA GONNA DO WHEN THEY COME FOR YOU');
});

