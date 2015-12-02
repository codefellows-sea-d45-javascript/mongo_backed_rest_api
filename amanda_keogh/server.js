var fs = require('fs');
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var morderorsRouter = require(__dirname + '/routes/morderors_routes.js');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/morderor_dev');

app.get("/:filename", function(req, res, next) {
  fs.stat(__dirname + "/build/" + req.params.filename, function(err, stats){
    if (err) {
      console.log(err);
      return next();
    }

    if (!stats.isFile) return next();

    var file = fs.createReadStream(__dirname + '/build/' + req.params.filename);
    file.pipe(res);

  })
})

app.use('/api', morderorsRouter);

app.use(function(req, res) {
  res.status(404).send('file too stupid to be found');
})

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening');
});
