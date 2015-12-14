require('angular/angular');
var angular = window.angular;

var selfDestructApp = angular.module('SelfDestructApp', []);
require('./services/services')(selfDestructApp);
require('./directives/directives')(selfDestructApp);
require('./messages/messages')(selfDestructApp);
