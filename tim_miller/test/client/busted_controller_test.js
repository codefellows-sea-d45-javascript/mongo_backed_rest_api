require(__dirname + '/../../app/js/entry.js');
require('angular-mocks');

describe('busted controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('OfficerAndFelonApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('BustedController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
  });

  describe('busted controller function', function() {

    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('BustedController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should respond to a $scope.busted()', function() {
      $httpBackend.expectGET('/api/busted').respond(200, {name: 'test name'});
      $scope.busted();
      $httpBackend.flush();
      expect($scope.outcome.name).toBe('test name');
    });

  });
});
