//Got help from in class code

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;


process.env.MONGOLAB_URI = 'mongodb://localhost/recipe_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Recipe = require(__dirname + '/../models/recipe').Recipe;

describe('recipe routes', function(){
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });

  it('should create a recipe with a POST request',function(done){
    var recipeData = {title:'Tacos', ingredients:['pork', 'cumin', 'chili powder', 'garlic', 'onions', 'tomatoes']};
    chai.request('http://localhost:3000')
      .post('/recipes')
      .send(recipeData)
      .end(function(err,res){
        expect(err).to.eql(null);
        expect(res.body.title).to.eql('Tacos');
        expect(res.body.ingredients).to.include('tomatoes');
        expect(res.body).to.have.property('_id');
        done();
      });
    });

  it('should get all the recipes with a GET request', function(done){
    chai.request('http://localhost:3000')
    .get('/recipes')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  describe('a test recipe', function(){
    beforeEach(function(done){
      (new Recipe({title: "Teriyaki", ingredients:['rice', 'chicken', 'soy sauce', 'sugar']}))
        .save(function(err, data){
          this.recipe = data;
          done();
        }.bind(this));
      });

    it('should be modified by a PUT request', function(done){
      chai.request('http://localhost:3000')
      .put('/recipes/' + this.recipe._id)
      .send({title:"Spicy Teriyaki", ingredients:['rice', 'chicken', 'soy sauce', 'siracha', 'sugar'], reviews: [{text:"It was okay", rating:3}]})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Recipe updated!');
        done();
      });
    });

    it('should be modified by a PUT request with a review', function(done){
      chai.request('http://localhost:3000')
      .put('/recipes/review/' + this.recipe._id)
      .send({text:"It was tasty!", rating:5})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Review Added!');
        done();
      });
    });

    it('should return all recipes with a specified ingredient', function(done){
      chai.request('http://localhost:3000')
      .get('/recipes-made-with/' + this.recipe.ingredients[0])
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
    });

    it('should be deleted by a DELETE request', function(done){
      chai.request('http://localhost:3000')
      .delete('/recipes/' + this.recipe._id)
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Recipe deleted!');
        done();
      });
    });
  });
});
