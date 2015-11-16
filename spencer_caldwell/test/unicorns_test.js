var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/unicorn_stream_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Unicorn = require(__dirname + '/../models/unicorns');

describe('unicorn routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a unicorn', function() {
    var unicornData = {name: 'test unicorn'};
    chai.request('localhost:3000')
      .post('/api/unicorns')
      .send(unicornData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test unicorn');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should be able to get all the ... or da unicorns', function(done) {
    chai.request('localhost:3000')
      .get('/api/unicorns')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('needs a unicorn', function() {
    beforeEach(function(done) {
      (new Unicorn({name: 'test unicorn'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.unicorn = data;
        done();
      }.bind(this))
    });

    it('should be able to modify a unicorn', function(done) {
      chai.request('localhost:3000')
        .put('/api/unicorn/' + this.unicorn._id)
        .send({name: 'a different unicorn name'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });

    it('should be able to murder a unicorn', function(done) {
      chai.request('localhost:3000')
        .delete('/api/unicorns' + this.unicorn._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });
  });

});
