require('angular/angular');
var angular = window.angular

var bookStreamApp = angular.module('bookStreamApp', []);
require('./books/books')(bookStreamApp);
