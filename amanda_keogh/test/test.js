var chai = require('chai');
var chaihttp = require('chai-http');
chai.use('chaihttp');
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/morderor_dev';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Morderor = require(__dirname + '/../models/morderor');
