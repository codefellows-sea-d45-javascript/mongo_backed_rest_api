var basicHttp = module.exports = exports = function(req, res, next) {
  try{
    var authString = req.headers.authorization;
    var basicString = authString.split(' ')[1];
    basicString = basicString || new Buffer(':').toString('base64');
    var basicBuffer = new Buffer(basicString, 'base64');
    var authArray = basicBuffer.toString().split(':');
    req.auth = {
      username: authArray[0],
      password: authArray[1]
    };
    next();
  } catch(e) {
    console.log(e);
    return res.status(401).json({msg: 'What chu talking bout Willis from the basic http'});
  }
};
