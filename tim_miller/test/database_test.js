var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/officers_felons_test';
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var Officer = require(__dirname + '/../models/officers.js');
var Felon = require(__dirname + '/../models/felons.js');

describe('the routes', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  describe('the chuck route', function() {

    it('should respond with a random chuck fact in the form of a string', function(done) {

      chai.request('localhost:3000')
        .get('/chuck')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(typeof res.text).to.eql('string');
          done();
      });
    });
  });

  describe('the busted route', function() {

    beforeEach(function(done) {
      (new Officer({name: 'test test'})).save(function(err, data) {
          expect(err).to.eql(null);
          this.officer = data;
          done();
        }.bind(this));
      });
    beforeEach(function(done) {
      (new Felon({name: 'test test'})).save(function(err, data) {
          expect(err).to.eql(null);
          this.felon = data;
          done();
        }.bind(this));
      });

    it('should respond with a string of the outcome', function(done) {

      chai.request('localhost:3000')
        .get('/busted')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(typeof res.text).to.eql('string');
          done();
        });
    });
  });
});
