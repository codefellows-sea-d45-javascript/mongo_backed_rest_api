require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('morderors controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('morderMens'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  // test that test harness is up and running properly, and that mocked angular
  // environment is set up with morderor controller
  it('should create a controller', function() {
    var controller = $ControllerConstructor('IntroController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.morderors)).toBe(true);
  });
})
