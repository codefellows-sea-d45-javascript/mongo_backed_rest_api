var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/officers_felons_test';
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var Officer = require(__dirname + '/../models/officers.js');

describe('the officer routes', function() {

  before(function(done) {
    var testUser = {username: 'test', password: 'testing123'};
    chai.request('localhost:3000')
      .post('/signup')
      .send(testUser)
      .end(function(err, res) {
        this.token = JSON.parse(res.text).token;
        expect(err).to.eql(null);
        done();
    }.bind(this));
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
  describe('the officer routes', function() {

    it('should be able to create an officer', function(done) {
      var testOfficer = {name: 'james bond', token: this.token};
      chai.request('localhost:3000')
        .post('/officers')
        .send(testOfficer)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('_id');
          expect(res.body.name).to.eql('james bond');
          expect(res.body.criminalsBusted).to.eql(0);
          done();
      });
    });

    it('should be able to return all officers', function(done) {
      chai.request('localhost:3000')
        .get('/officers')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          done();
      });
    });
    describe('the put and delete routes', function() {

      beforeEach(function(done) {
        this.officer = {name: 'officer test', token: this.token};
        chai.request('localhost:3000')
          .post('/officers')
          .send(this.officer)
          .end(function(err, res) {
            expect(err).to.eql(null);
            done();
        });
      });

      it('should update an officer', function(done) {
        chai.request('localhost:3000')
          .put('/officers')
          .send({name: 'officer test', token: this.token})
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.text).to.eql('updated!');
            done();
          });
      });

      it('should delete an officer', function(done) {
        chai.request('localhost:3000')
          .delete('/officers/' + this.officer._id)
          .send({token: this.token})
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.text).to.eql('deleted!');
            done();
          });
      });
    });
  });
});
