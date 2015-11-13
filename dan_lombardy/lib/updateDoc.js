var Message = require(__dirname + '/../models/message');
var errorHandler = require(__dirname + '/errorHandler');

module.exports = function(doc, change, res){
  Message.findOneAndUpdate(doc, change, {new:true}, function(err, doc){
    errorHandler(err, res);
      res.json(doc);
  });
}
