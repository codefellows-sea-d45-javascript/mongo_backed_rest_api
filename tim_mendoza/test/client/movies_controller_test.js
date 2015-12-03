require(__dirname + '/../../app/js/entry.js');
require('angular-mocks');

describe('the movies controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('MoviesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to creat a controller', function() {
    var controller = $ControllerConstructor('MoviesController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.movies)).toBe(true);
  });

  describe('REST request function', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('MoviesController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an array to movies with a GET all', function() {
      $httpBackend.expectGET('/api/movies').respond(200, [{_id: 1, title:'thing'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.movies[0].title).toBe('thing');
    });
  });
});
