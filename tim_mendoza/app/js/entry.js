require('angular/angular');
var angular = window.angular;

var moviesApp = angular.module('MoviesApp', []);
require('./movies/movies')(moviesApp);
