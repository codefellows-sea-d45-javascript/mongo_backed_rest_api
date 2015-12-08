var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/officers_felons_test';
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user.js');

describe('the auth routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a user', function(done) {
    var testUser = {username: 'test', password: 'testing123'};
    chai.request('localhost:3000')
      .post('/signup')
      .send(testUser)
      .end(function(err, res) {
        res.text = JSON.parse(res.text);
        expect(err).to.eql(null);
        expect(res.text).to.have.property('token');
        done();
    });
  });
  describe('routes that need a user', function() {

    before(function(done) {
      this.user = {username: 'uniqueUser', password: 'testing123'};
      chai.request('localhost:3000')
        .post('/signup')
        .send(this.user)
        .end(function(err, res) {
          res.text = JSON.parse(res.text);
          expect(err).to.eql(null);
          expect(res.text).to.have.property('token');
          done();
      });
    });

    it('should be able to sign in to a already created user', function(done) {
      chai.request('localhost:3000')
        .get('/signin')
        .auth(this.user.username, this.user.password)
        .end(function(err, res) {
          res.text = JSON.parse(res.text);
          expect(err).to.eql(null);
          expect(res.text).to.have.property('token');
          done();
      }.bind(this));
    });

    it('should check for a unique username', function(done) {
      chai.request('localhost:3000')
        .post('/signup')
        .send(this.user)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.error.text).to.eql('{"msg":"Server Error"}');
          done();
      });
    });
  });
});
