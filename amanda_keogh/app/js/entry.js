require('angular/angular');
var angular = window.angular;

var morderMens = angular.module('morderMens', []);
morderMens.controller('IntroController', ['$scope', function($scope) {
  $scope.intro = 'You thought Rock/Paper/Scissors was intense. You were wrong!';
  $scope.choice = 'Rock'; //default
}])
