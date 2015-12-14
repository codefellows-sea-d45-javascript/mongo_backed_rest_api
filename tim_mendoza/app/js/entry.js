require('angular/angular');
require('angular-route');
var angular = window.angular;

var moviesApp = angular.module('MoviesApp', ['ngRoute']);
require('./services/services')(moviesApp);
require('./movies/movies')(moviesApp);

moviesApp.config(['$routeProvider', function($route) {
  $route.when(
    '/movies', {
      templateUrl: 'templates/movies_view.html',
      controller: 'MoviesController'
    }).otherwise({
      redirectTo: '/movies'
    });
}]);
