var eat = require('eat');
var User = require(__dirname + '/../models/user');

module.exports = exports = function(req, res, next) {
  var token = req.header.token || (req.body)? req.body.token : '';

  if (!token) {
    console.log('You must haz a token');
    return res.status(401).json({msg: 'What you talking about willis'});
  }

  eat.decode(token, process.env.APP_SECRET, function(err, decoded) {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'what you talking about willis'});
    }

    User.findOne({_id: decoded._id}, function(err, user) {
      if (err) {
        console.log(err);
        return res.status(401).json({msg: 'what you talking about willis'});
      }

      req.user = user;
      next();

    });
  });
};
