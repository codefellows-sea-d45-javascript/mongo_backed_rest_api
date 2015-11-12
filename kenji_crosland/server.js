//Made with help from in class code

var mongoose = require('mongoose')
var express = require('express');
var app = express();
var recipesRouter = require(__dirname + '/routes/recipes_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/recipe_database');

app.use(recipesRouter);

app.listen(process.env.PORT || 3000, function(){
  console.log('server up');
})
