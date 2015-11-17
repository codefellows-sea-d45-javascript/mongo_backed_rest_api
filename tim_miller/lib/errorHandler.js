var handleDefaultError = module.exports.default = function(err, res) {
  console.log(err);
  res.status(500).json({msg: 'Server Error'});
};

var handleRequireError = module.exports.require = function(err, res) {
  console.log(err);
  res.status(400).json({msg: 'Must have a name property with a string value'});
};
