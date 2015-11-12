//Made with help of in class code.
var express = require('express');
var bodyParser = require('body-parser');
var Recipe = require(__dirname + '/../models/recipe');
var recipeRouter = module.exports = express.Router();

recipeRouter.get('/recipes', function(req, res){
  Recipe.find({}, function(err, data){
    if (err) throw err;
    res.json(data);
  })
})

recipeRouter.post('/recipes', bodyParser.json(), function(req, res){
  var newRecipe = new Recipe(req.body);
  newRecipe.save(function(err, data){
    if (err) throw err;
    res.json(data);
  })
});

recipeRouter.put('/recipes/:id', bodyParser.json(), function(req, res){
  var recipeData = req.body;
  delete recipeData._id;
  Recipe.update({_id: req.params.id}, recipeData, function(err){
    if (err) throw err;
    res.json({msg: 'Recipe updated'});
  });
});

recipeRouter.delete('/recipes/:id', function(req, res){
  Recipe.remove({_id: req.params.id}, function(err){
    if (err) return err;
    res.json({msg: 'recipe deleted!'});
  })
})
