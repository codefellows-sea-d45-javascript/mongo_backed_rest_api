var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/morderor_dev';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Morderor = require(__dirname + '/../models/morderor');

describe('morderor routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should retrieve all morderors!', function(done) {
    chai.request('localhost:3000')
    .get('/api/morderors')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should make a new morderor!', function(done) {
    var testObj = {name: 'testObj'};
    chai.request('localhost:3000')
      .post('/api/morderors')
      .send(testObj)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('testObj');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('needs test obj', function() {
    beforeEach(function(done) {
      (new Morderor({name: 'paper'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.morderor = data;
        done();
      }.bind(this));
    })

    it('should modify a morderor!', function(done) {
      chai.request('localhost:3000')
        .put('api/morderors/paper')
        .send({name: 'scissors'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.name).to.eql('paper');
          done();
        });
    });

    it('should delete!', function(done) {
      chai.request('localhost:3000')
        .delete('api/morderors/paper')
        .end(function(err,res) {
          expect(err).to.eql(null);
          done();
        })
    });
  });
});
