require('angular/angular');
var angular = window.angular

var bookStreamApp = angular.module('bookStreamApp', []);
require('./books/books')(bookStreamApp);

var selfDestructApp = angular.module('SelfDestructApp', []);
require('./services/services')(selfDestructApp);
require('./directives/directives')(selfDestructApp);
