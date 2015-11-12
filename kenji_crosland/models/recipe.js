//Created with help from http://mongoosejs.com/docs/index.html
var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('db connection open');
});

var recipeSchema = mongoose.Schema({
  title: String,
  ingredients: Array
});

var Recipe = module.exports = mongoose.model('Recipe', recipeSchema);

// var tacos = new Recipe({title: 'Tacos', ingredients: ['meat', 'cheese']});

// console.log(tacos);
