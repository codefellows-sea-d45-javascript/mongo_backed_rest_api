module.exports = function(err, res){
  if(err) return function(err, res){
  console.log("There was a connection error of " + err);
  res.status(500).json({errmsg: "There was a connection error"});
  };

}
