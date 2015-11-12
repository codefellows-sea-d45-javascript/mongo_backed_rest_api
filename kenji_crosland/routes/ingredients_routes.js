var express = require('express');
var bodyParser = require('body-parser');
var Recipe = require(__dirname + '/../models/recipe').Recipe;
var ingredientsRouter = module.exports = express.Router();

ingredientsRouter.get('/recipes-made-with/:ingredient', function(req, res){
  //Replaces hyphen with space for ingredients with a space in them.
  //Got regex from here : http://stackoverflow.com/questions/14262770/javascript-replace-dash-hyphen-with-a-space
  var ingredient = req.params.ingredient.replace(/-/g, ' ');
  Recipe.find({ingredients: ingredient}, function(err, data){
    if (err) throw err;
    res.json(data);
  })
})
