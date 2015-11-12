var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;


process.env.MONGOLAB_URI = 'mongodb://localhost/recipe_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Recipe = require(__dirname + '/../models/recipe');

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
        expect(res.body).to.have.property('_id');
        done();
      })
  })
})
