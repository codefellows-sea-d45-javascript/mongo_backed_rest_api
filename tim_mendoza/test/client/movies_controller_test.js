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

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('MoviesController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.movies)).toBe(true);
  });

  describe('REST request functions', function() {
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

    it('should be able to create a new movie', function() {
      $httpBackend.expectPOST('/api/movies', {title: 'testmovie'}).respond(200, {title: 'a different movie'});
      expect($scope.movies.length).toBe(0);
      expect($scope.newMovie).toBe(undefined);
      $scope.newMovie = {title: 'testmovie'};
      $scope.create($scope.newMovie);
      $httpBackend.flush();
      expect($scope.newMovie).toBe(null);
      expect($scope.movies[0].title).toBe('a different movie');
    });

    it('should be able to delete a movie', function() {
      $httpBackend.expectDELETE('/api/movies/12345').respond(200);
      $scope.movies[0] = {
        _id: 12345,
        title: 'test'
      };
      $scope.movies[1] = {title: 'othermovie'};
      $scope.remove($scope.movies[0]);
      $httpBackend.flush();
      expect($scope.movies[0].title).toBe('othermovie');
    });
    it('should be able to update a movie', function() {
      $httpBackend.expectPUT('/api/movies/23456').respond(200, 'update succesful');
      $scope.movies = [
        {title: 'movieone'},
        {title: 'movietwo', year: 1999, _id: '23456'},
        {title: 'moviethree'}
      ];
      $scope.edit($scope.movies[1]);
      expect($scope.movies[1].title).toBe('moviethree');
      expect($scope.editing).toBe(true);
      expect($scope.newMovie.title).toBe('movietwo');
      $scope.newMovie.title = 'movieedit';
      $scope.submitEdit($scope.newMovie);
      $httpBackend.flush();
      expect($scope.movies[2].title).toBe('movieedit');
    });
  });
});
