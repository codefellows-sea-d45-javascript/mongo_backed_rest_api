var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/officers_felons_test';
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var Felon = require(__dirname + '/../models/felons.js');


describe('the felon routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create felons', function() {
    var testFelon = {name: 'odd job', crime: 'bank robber'};
    chai.request('localhost:3000')
      .post('/felons')
      .send(testFelon)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body.name).to.eql('odd job');
        expect(res.body.inJail).to.eql(false);
    });
  });
  it('should be able to return all felons', function(done) {
    chai.request('localhost:3000')
      .get('/felons')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
    });
  });
  describe('the put and delete routes for felons', function() {

    beforeEach(function(done) {
      (new Felon({name: 'test test'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.felon = data;
        done();
      }.bind(this));
    });

    it('should update a felon', function(done) {
      chai.request('localhost:3000')
        .put('/felons')
        .send({name: 'dexter'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.text).to.eql('updated!');
          done();
      });
    });

    it('should delete a felon', function(done) {
      chai.request('localhost:3000')
        .delete(/felons/ + this.felon._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.text).to.eql('deleted!');
          done();
      });
    });
  });
});
