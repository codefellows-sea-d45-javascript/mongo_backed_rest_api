require('angular/angular');
var angular = window.angular;

var selfDestructApp = angular.module('destuctDescribe', []);
selfDestructApp.controller("DescriptionController", ['$scope', function($scope){
  $scope.nifty = "I'm Nifty!";
}]);
