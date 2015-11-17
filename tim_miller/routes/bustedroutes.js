var express = require('express');
var Officer = require(__dirname + '/../models/officers');
var Felon = require(__dirname + '/../models/felons');
var error = require(__dirname + '/../lib/errorHandler.js');

var bustedRouter = module.exports = exports = express.Router();

bustedRouter.get('/busted', function(req, res, next) {

  Officer.findOne({}, function(err, data) {
    if (err) return error.default(err, res);
    if(data === null) res.send('There are no officers to bust the criminals!');

    req.officer = data;
    next();
  });
});


bustedRouter.get('/busted', function(req, res, next) {
  Felon.findOne({}, function(err, data) {
    if (err) return error.default(err, res);
    if(data === null || data.inJail === true) {
     res.send('There are no felons to bust.');
     res.end();
    }

    req.felon = data;
    next();
  });
});

bustedRouter.get('/busted', function(req, res, next) {
  var ran = Math.floor(Math.random() * 10 + 1);
  if (ran > 8) {
    Felon.remove({_id: req.felon._id}, function(err) {
      if(err) return error.default(err, res);

      req.busted = ('SHOTS FIRED! ' + req.officer.name + ' killed ' + req.felon.name + '!' );
      req.officer.criminalsBusted++;
      next();
    });
  }
  if (ran < 8) {
    Felon.update({_id: req.felon._id}, {inJail: true},  function(err) {
      if(err) return error.default(err, res);

      req.busted = (req.officer.name + ' has apprehended ' + req.felon.name + '.');
      req.officer.criminalsBusted++;
      next();
    });
  }
});

bustedRouter.get('/busted', function(req, res) {
  Officer.update({_id: req.officer._id}, {criminalsBusted: req.officer.criminalsBusted}, function(err) {
    if(err) return error.default(err, res);

    res.send(req.busted);
  });
});
