var express = require('express');
var bodyParser = require('body-parser');
var User = require(__dirname + '/../models/user.js');
var basicHttp = require(__dirname + '/../lib/basic_http.js');
var error = require(__dirname + '/../lib/errorHandler.js');

var authRouter = module.exports = exports = express.Router();

authRouter.get('/signin', basicHttp, function(req, res) {
  if(!(req.auth.username && req.auth.password)) {
    console.log('Make sure you are using basic auth standards');
    return res.status(401).json({msg: 'What you talkin bout Willis'});
  }

  User.findOne({'auth.basic.username': req.auth.username}, function(err, user) {
    if(err) {
      console.log('Make sure your authorization was in basic format.');
      return res.status(401).json({msg: 'what you talking about willis'});
    }
    if(!user) {
      console.log('Make sure your username is correct');
      return res.status(401).json({msg: 'what you talking about willis'});
    }
    if(user.checkPassword(req.auth.password, user.auth.basic.password)) {
      console.log('Wrong password');
      return res.status(401).json({msg: 'what you talking about willis'});
    }

    user.generateToken(function(err, token) {
      if (err) return error.default(err, res);

      res.json({token: token});
    });
  });
});

authRouter.post('/signup', bodyParser.json(), function(req, res, next) {
  var user = new User();

  user.auth.basic.username = req.body.username;
  user.username = req.body.username;
  user.hashPassword(req.body.password, function(err, hash) {
    user.auth.basic.password = hash;

      user.save(function(err, data) {
      if (err) return error.default(err, res);
      user.generateToken(function(err, token) {
        if (err) return error.default(err, res);

        res.json({token: token});
      });
    });
  });
});

