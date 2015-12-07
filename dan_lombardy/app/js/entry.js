require('angular/angular');
var angular = window.angular;

var selfDestructApp = angular.module('SelfDestructApp', []);
require('./messages/messages')(selfDestructApp);
