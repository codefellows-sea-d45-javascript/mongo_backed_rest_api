var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/officers_felons_test';
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var Officer = require(__dirname + '/../models/officers.js');

describe('the officer routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
  describe('the officer routes', function() {

    it('should be able to create an officer', function(done) {
      var testOfficer = {name: 'james bond'};
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
        (new Officer({name: 'test test'})).save(function(err, data) {
          expect(err).to.eql(null);
          this.officer = data;
          done();
        }.bind(this));
      });

      it('should update an officer', function(done) {
        chai.request('localhost:3000')
          .put('/officers')
          .send({name: 'officer test'})
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.text).to.eql('updated!');
            done();
          });
      });

      it('should delete an officer', function(done) {
        chai.request('localhost:3000')
          .delete('/officers/' + this.officer._id)
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.text).to.eql('deleted!');
            done();
          });
      });
    });
  });
});
