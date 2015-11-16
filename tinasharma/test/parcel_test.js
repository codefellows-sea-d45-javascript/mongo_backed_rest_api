var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/parcel_stream_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Parcel = require(__dirname + '/../models/parcel');

describe('parcel routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a parcel', function(done) {
    var parcelData = {item: 'test parcel'};
    chai.request('localhost:3000')
      .post('/api/parcels')
      .send(parcelData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.item).to.eql('test parcel');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should be able to get all parcels', function(done) {
    chai.request('localhost:3000')
      .get('/api/parcels')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

});
