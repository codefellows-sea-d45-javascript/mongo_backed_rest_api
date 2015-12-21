describe('the cfResource service', function() {
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
  describe('the resource object', function() {
    beforeEach(angular.mock.inject(function(_restResource_, _$httpBackend_) {
      $restResource = _restResource_('test');
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('the get function', function() {
      it('should call the callback on data', function() {
        $httpBackend.expectGET('/api/test').respond(200, 'ok');
        $restResource.get(function(err, data) {
          expect(err).toBeNull();
          expect(data).toBe('ok');
        });
        $httpBackend.flush();
      });
      it('should call the callback on error', function() {
        $httpBackend.expectGET('/api/test').respond(500, 'error');
        $restResource.get(function(err, data) {
          expect(err).toBe('error');
        });
        $httpBackend.flush();
      });
    });

    describe('the create function', function() {
      it('should call the callback on data', function() {
        $httpBackend.expectPOST('/api/test', 'data').respond(200, 'ok');
        $restResource.create('data', function(err, data) {
          expect(err).toBeNull();
          expect(data).toBe('ok');
        });
        $httpBackend.flush();
      });
      it('should call the callback on error', function() {
        $httpBackend.expectPOST('/api/test', 'data').respond(500, 'error');
        $restResource.create('data', function(err, data) {
          expect(err).toBe('error');
        });
        $httpBackend.flush();
      });
    });

    describe('the update function', function() {
      it('should call the callback on data', function() {
        $httpBackend.expectPUT('/api/test/123', {_id: 123}).respond(200, 'ok');
        $restResource.update({_id: 123}, function(err, data) {
          expect(err).toBeNull();
          expect(data).toBe('ok');
        });
        $httpBackend.flush();
      });
      it('should call the callback on error', function() {
        $httpBackend.expectPUT('/api/test/123', {_id: 123}).respond(500, 'error');
        $restResource.update({_id: 123}, function(err, data) {
          expect(err).toBe('error');
        });
        $httpBackend.flush();
      });
    });

    describe('the delete function', function() {
      it('should call the callback on data', function() {
        $httpBackend.expectDELETE('/api/test/123').respond(200, 'ok');
        $restResource.delete({_id: 123}, function(err, data) {
          expect(err).toBeNull();
          expect(data).toBe('ok');
        });
        $httpBackend.flush();
      });
      it('should call the callback on error', function() {
        $httpBackend.expectDELETE('/api/test/123').respond(500, 'error');
        $restResource.delete({_id: 123}, function(err, data) {
          expect(err).toBe('error');
        });
        $httpBackend.flush();
      });
    });
  });
});
