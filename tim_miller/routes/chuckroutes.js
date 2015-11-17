var express = require('express');
var chuck = require(__dirname + '/../lib/chuck.js');

var chuckRouter = module.exports = exports = express.Router();

chuckRouter.get('/chuck', function(req, res) {
  res.send(chuck());
});
