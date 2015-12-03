require(__dirname + '/../../app/js/entry.js');
require('angular-mocks');

describe('the movies controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('MoviesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope;
    $ControllerConstructor = $controller;
  }));

  it('should be able to creat a controller', function() {
    var controller = $ControllerConstructor('MoviesController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.movies)).toBe(true);
  });
});
