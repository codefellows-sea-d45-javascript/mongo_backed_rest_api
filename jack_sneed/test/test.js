var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/ninja_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Ninja = require(__dirname + '/../models/ninja');
var Battle = require(__dirname + '/../models/battle');

describe('ninja routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a ninja', function(done) {
    var ninjaData = {name: 'test ninja'};
    chai.request('localhost:3000')
      .post('/api/ninja')
      .send(ninjaData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test ninja');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should be able to get all the ninjas', function(done) {
    chai.request('localhost:3000')
      .get('/api/ninja')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('New Ninja', function() {
    beforeEach(function(done) {
      (new Ninja({name: 'test ninja'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.ninja = data;
        done();
      }.bind(this));
    });

    it('should be able to change a weapon', function(done) {
      chai.request('localhost:3000')
        .put('/api/ninja/' + this.ninja._id)
        .send({weapon: 'broken beer bottle'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Ninja out!');
          done();
        });
    });
  });
});

describe('battle routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a battle', function(done) {
    var battleData = {name: 'test battle'};
    chai.request('localhost:3000')
      .post('/api/battle')
      .send(battleData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test battle');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('Get all battles', function(done) {
    chai.request('localhost:3000')
      .get('/api/battle')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('New Battle ', function() {
    beforeEach(function(done) {
      (new Battle({name: 'test battle'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.battle = data;
        done();
      }.bind(this));
    });

    it('should be able to commit 11 party fouls', function(done) {
      chai.request('localhost:3000')
        .put('/api/battle/' + this.battle._id)
        .send({partyFouls: 11})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Ninja down!');
          done();
        });
    });

  });
});
