require('angular/angular');
var angular = window.angular;

var officerApp = angular.module('officersAndFelons', []);
officerApp.controller('OfficerController', ['$scope', function($scope) {
  $scope.greeting = 'What cha gonna do when the come for you?';

  $scope.alertGreeting = function() {
    alert($scope.greeting);
  };
}]);
