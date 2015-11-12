var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/player_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Player = require(__dirname + '/../models/player');

describe('player routes', function() {
  after(function (done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a player', function(done) {
    var playerData = {firstName: 'Felix', lastName: 'Hernandez' };
    chai.request('localhost:3000')
      .post('/api/player')
      .send(playerData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.firstName).to.eql('Felix');
        expect(res.body.lastName).to.eql('Hernandez');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should be able to get all players from a team', function(done) {
    chai.request('localhost:3000')
    .get('/api/player/Mariners')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  describe('to modify the player database', function() {
    beforeEach(function(done) {
      (new Player({firstName: 'David', lastName: 'Price', team: 'free_agent',})).save(function(err, data) {
        expect(err).to.eql(null);
        this.player = data;
        done();
      }.bind(this));
    });

    it('should be able to modify a player', function(done) {
      chai.request('localhost:3000')
        .put('/api/player/' + this.player._id)
        .send({team: 'Mariners'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('update success!');
          done();
        });
    });

    it('should be able to remove a player', function(done) {
      chai.request('localhost:3000')
        .delete('/api/player/' + this.player._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('delete success!');
          done();
        });
    });
  });
});
