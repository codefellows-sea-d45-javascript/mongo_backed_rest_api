var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/ninja_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Ninja = require(__dirname + '/../models/ninja');

describe('ninja routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a ninja', function(done) {
    var ninjaData = {name: 'test ninja'};
    chai.request('localhost:3000')
      .post('/api/ninja')
      .send(ninjaData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test ninja');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should be able to get all da ninjas', function(done) {
    chai.request('localhost:3000')
      .get('/api/ninja')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('needs a ninja', function() {
    beforeEach(function(done) {
      (new Ninja({name: 'test ninja'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.ninja = data;
        done();
      }.bind(this));
    });

    it('should be able to change a weapon', function(done) {
      chai.request('localhost:3000')
        .put('/api/ninja/' + this.ninja._id)
        .send({weapon: 'broken beer bottle'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Ninja out!');
          done();
        });
    });
  });
});
