'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var fs = require('fs');
var currentTime = require('../lib/date.js');

process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/tapir_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Tapir = require(__dirname + '/../models/tapir');

var testTapir = {name: 'floppy',
  age: 15,
  weight: 550
}

describe('API that keeps track of various tapirs', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to add a new tapir', function(done) {
    chai.request('localhost:3000')
      .post('/api/tapirs')
      .send(testTapir)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body).to.have.property('_id');
        done();
      })
  })

  it('should log the creation of a tapir, the time, and the date', function(done) {
    chai.request('localhost:3000')
      .post('/api/tapirs')
      .send(testTapir)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(currentTime()).to.eql(console.log('New tapir added to database at [' + new Date() + '].'));
        done();
      })
  })
})
