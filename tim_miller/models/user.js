var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  username: {type: String, require: true, index: true, unique: true},
  auth: {
    basic: {
      username: String,
      password: String
    }
  }
});

userSchema.methods.hashPassword = function(password, callback) {
  bcrypt.genSalt(8, function(err, salt) {
    if (err) console.log(err);
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) console.log(err);
      return callback(err, hash);
    });
  });
};

userSchema.methods.checkPassword = function(password, hash) {
  bcrypt.compare(password, hash, function(err, res) {
    if (err) console.log(err);

    return res;
  });
};

userSchema.methods.generateToken = function(callback) {
  var id = this._id;
  eat.encode({_id: id}, process.env.APP_SECRET, callback);
};

module.exports = exports = mongoose.model('User', userSchema);
