require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('books controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('bookApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('booksController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.books)).toBe(true);
  });

  describe('REST request functions', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('booksController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should populate scope.books array with by running retrieveBooks()', function() {
      $httpBackend.expectGET('/api/books').respond(200, [{_id: 1, description: 'test book'}]);
      $scope.retrieveBooks();
      $httpBackend.flush();
      expect($scope.books[0].description).toBe('test book');
    });

    it('should be able to create a new bookk', function() {
      $httpBackend.expectPOST('/api/books', {description: 'test book', author: 'test author', priority: 1}).respond(200, {description: 'a different book'});
      expect($scope.books.length).toBe(0);
      expect($scope.newBook).toEqual($scope.defaults);
      $scope.newBook.description = 'test book';
      $scope.createBook($scope.newBook);
      $httpBackend.flush();
      expect($scope.books[0].description).toBe('a different book');
    });

    it('should be able to modify a book', function() {
      $httpBackend.expectGET('/api/books').respond(200, [{_id: 1, description: 'test book', completed: false}]);
      $scope.retrieveBooks();
      $httpBackend.flush();

      $httpBackend.expectPUT('/api/books/1').respond(200, [{_id: 1, description: 'test book', completed: false}]);
      expect($scope.books[0].completed).toBe(false);
      $scope.updateBook($scope.books[0]);
      $httpBackend.flush();
      expect($scope.books[0].completed).toBe(true);
    });

    it('should be able to delete a book', function() {
      $httpBackend.expectGET('/api/books').respond(200, [{_id: 1, description: 'test book'}]);
      $scope.retrieveBooks();
      $httpBackend.flush();

      $httpBackend.expectPOST('/api/books/delete/1').respond(200, [{_id: 1, description: 'test book'}]);
      expect($scope.books[0].description).toBe('test book');
      $scope.token = true;
      $scope.deleteBook($scope.books[0]);
      $httpBackend.flush();
      expect($scope.books[0]).toBe(undefined);
    });
  });
});
