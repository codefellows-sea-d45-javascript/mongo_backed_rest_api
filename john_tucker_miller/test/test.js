var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URL = 'mongodb://localhost/bear_stream_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Bear = require(__dirname + '/../models/bear');

describe('bear routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a bear', function(done) {
    var bearData = {name: 'test bear'};
    chai.request('localhost:3000')
      .post('/api/bears')
      .send(bearData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test bear');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should be able to get all da bears', function(done) {
    chai.request('localhost:3000')
      .get('/api/bears')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('needs a bear', function() {
    beforeEach(function(done) {
      (new Bear({name: 'test bear'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.bear = data;
        done();
      }.bind(this));
    });

    it('should be able to modify a bear', function(done) {
      chai.request('localhost:3000')
        .put('/api/bears/' + this.bear._id)
        .send({name: 'a different bear name'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });
});
