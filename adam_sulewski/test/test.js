var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var fs = require('fs');

process.env.MONGOLAB_URI = 'mongodb://localhost/sayings_es_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Saying = require(__dirname + '/../models/saying');

describe('saying routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should create a saying', function(done) {
    var sayingData = {saying: 'test'};
    chai.request('localhost:3000')
      .post('/api/sayings')
      .send(sayingData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.saying).to.eql('test');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should get all sayings', function(done) {
    chai.request('localhost:3000')
      .get('/api/sayings')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('update and delete', function() {
    beforeEach(function(done) {
      (new Saying({saying: 'test saying'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.saying = data;
        done();
      }.bind(this));
    });

    it('should be able to update a saying', function(done) {
      chai.request('localhost:3000')
        .put('/api/sayings/' + this.saying._id)
        .send({name: 'new test name'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });

    it('should be able to remove a saying', function(done) {
      chai.request('localhost:3000')
        .delete('/api/sayings/' + this.saying._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });
  });

  describe('index.html', function() {
    beforeEach(function() {
      this.index = fs.readFileSync(__dirname + '/../public/index.html').toString();
    });

    it('should server a static file', function(done) {
      chai.request('localhost:3000')
        .get('/api')
        .end(function(err, res) {
          expect(res.text).to.eql(this.index);
          done();
        }.bind(this));
    });
  });
});
