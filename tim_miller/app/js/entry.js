require('angular/angular');
var angular = window.angular;

var officerAndFelonApp = angular.module('OfficerAndFelonApp', []);
require('./services/services.js')(officerAndFelonApp);
require('./directives/directives.js')(officerAndFelonApp);
require('./officers/officers.js')(officerAndFelonApp);
require('./felons/felons.js')(officerAndFelonApp);
require('./busted/busted.js')(officerAndFelonApp);
