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

  describe('REST functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('IntroController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add to the morderors array with GETall', function() {
      $httpBackend.expectGET('/api/morderors').respond(200, [{_id: 1, name: 'testthing', verb: 'testaction'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.morderors[0].name).toBe('testthing');
    });

    it('should post a new bear', function() {
      $httpBackend.expectPOST('/api/morderors', {name: 'testthing', verb: 'testaction'}).respond(200, {name: 'differenttestthing'});
      expect($scope.morderors.length).toBe(0);
      $scope.create({name: 'testthing'});
      $httpBackend.flush();
      expect($scope.morderors[0].name).toBe('differenttestthing');
    })

  });
})
