//Made with help of in class code.
var express = require('express');
var bodyParser = require('body-parser');
var Recipe = require(__dirname + '/../models/recipe').Recipe;
var Review = require(__dirname + '/../models/review').Review;
var recipeRouter = module.exports = express.Router();

recipeRouter.get('/recipes', function(req, res){
  Recipe.find({}, function(err, data){
    if (err) throw err;
    res.json(data);
  });
});

recipeRouter.post('/recipes', bodyParser.json(), function(req, res){
  var newRecipe = new Recipe(req.body);
  newRecipe.save(function(err, data){
    if (err) throw err;
    res.json(data);
  });
});

//Pushing a new review to the recipes review array
recipeRouter.put('/recipes/review/:id', bodyParser.json(), function(req, res){
  var reviewData = req.body;
  Recipe.update({_id: req.params.id}, {$push: {reviews: reviewData}}, function(err){
    if (err) throw err;
    res.json({msg: 'Review Added!'});
  });
});

recipeRouter.put('/recipes/:id', bodyParser.json(), function(req, res){
  var recipeData = req.body;
  Recipe.update({_id: req.params.id}, recipeData, function(err){
    if (err) throw err;
    res.json({msg: 'Recipe updated!'});
  });
});

recipeRouter.delete('/recipes/:id', function(req, res){
  Recipe.remove({_id: req.params.id}, function(err){
    if (err) return err;
    res.json({msg: 'Recipe deleted!'});
  });
});
