require('angular/angular');
var angular = window.angular;

var moviesApp = angular.module('MoviesApp', []);
require('./services/services')(moviesApp);
require('./movies/movies')(moviesApp);
