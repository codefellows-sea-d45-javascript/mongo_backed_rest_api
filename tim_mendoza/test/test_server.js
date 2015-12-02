var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var mongoose = require('mongoose');
var Movie = require(__dirname + '/../models/movie');

chai.use(chaiHttp);

process.env.MONGOLAB_URI = 'mongodb://localhost/movies_test';
require(__dirname + '/../server');

describe('the movie router', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
  it('should be able to add a movie to the database', function(done) {
    var testMovie = {
      title: 'test',
    };
    chai.request('localhost:3000')
      .post('/api/movies')
      .send(testMovie)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.title).to.eql('test');
        done();
      });
  });
  it('should have an error if there is no title', function(done) {
    var testMovie = {
    year: '1986',
    director: 'Bob Smith'
  };
    chai.request('localhost:3000')
      .post('/api/movies')
      .send(testMovie)
      .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(500);
      expect(res.text).to.eql('server error');
      done();
    });
  });
  it('should have an error if the year is too high', function(done) {
    var nextYear = new Date().getFullYear() + 1;
    var testMovie = {
      title: 'testmovie',
      year: nextYear,
      director: 'Bob Smith'
    };
    chai.request('localhost:3000')
    .post('/api/movies')
    .send(testMovie)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(500);
      expect(res.text).to.eql('server error');
      done();
    });
  });
  it('should have an error if the year is too low', function(done) {
    var testMovie = {
    title: 'testmovie',
    year: '1812',
    director: 'Bob Smith'
  };
    chai.request('localhost:3000')
    .post('/api/movies')
    .send(testMovie)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(500);
      expect(res.text).to.eql('server error');
      done();
    });
  });
  it('should be able to get all the movies', function(done) {
    chai.request('localhost:3000')
    .get('/api/movies')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });
  describe('needs a movie', function() {
    beforeEach(function(done) {
      (new Movie({
        title: 'testmovie for put and delete',
        year: 1992
      })).save(function(err, data) {
        expect(err).to.eql(null);
        this.movie = data;
        done();
      }.bind(this));
    });
    it('should be able to update an existing movie', function(done) {
      chai.request('localhost:3000')
      .put('/api/movies/' + this.movie._id)
      .send({actors: 'Bob Smith'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.eql('update successful');
        done();
      });
    });
    it('should be able to delete a movie', function(done) {
      chai.request('localhost:3000')
      .delete('/api/movies/' + this.movie._id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.eql('delete successful');
        done();
      });
    });
  });
});
