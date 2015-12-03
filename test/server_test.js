var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var mongoose = require('mongoose');

chai.use(chaiHttp);

process.env.MONGOLAB_URI = 'mongod://localhost/book_test';
require(__dirname + '/../server');

describe('the book router', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
  it('should be able to add a book to the database', function(done) {
    var testBook = {
      title: 'test'.
    };
    chai.request('localhost:3000')
      .post('/api/books')
      .send(testBook)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.title).to.eql('test');
        done();
      });
  });
  it('should throw and error if there is no title', function(done) {
    var testBook = {
      year: '1937'
      author: 'J.R.R. Tolkein'
    chai.request('localhost:3000')
      .post('/api/books')
      .send(testBook)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.eql('Server Err0r!');
        done();
      });
  });
});
