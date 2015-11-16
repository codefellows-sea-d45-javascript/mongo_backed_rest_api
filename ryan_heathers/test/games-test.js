var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
chai.use(chaihttp);

process.env.MONGOLAB_URI = 'mongodb://localhost/boardgames_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Game = require(__dirname + '/../models/games');

describe('games REST API', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should retrieve all the board games', function(done) {
    chai.request('localhost:3000')
      .get('/api/games')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create a new board game in the db', function(done) {
    var game = { name: 'test game', genre: 'strategy', number_of_players: '2' };
    chai.request('localhost:3000')
      .post('/api/games')
      .send(game)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test game');
        expect(res.body.genre).to.eql('strategy');
        expect(res.body.number_of_players).to.eql(2);
        expect(res.body).to.have.property('_id');
        done();
      });
  });
});
