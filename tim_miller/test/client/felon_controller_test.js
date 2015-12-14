require(__dirname + '/../../app/js/entry.js');
require('angular-mocks');

describe('felon controller', function() {

  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('OfficerAndFelonApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('FelonsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.felons)).toBe(true);
  });

  describe('felon controller functions', function() {

    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('FelonsController', {$scope: $scope});
      $scope.felons = [];
    }));

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get response when getAllFelons() is called', function() {
      $httpBackend.expectGET('/api/felons').respond(200, [{_id: 1, name: 'test name'}]);
      $scope.getAllFelons();
      $httpBackend.flush();
      expect($scope.felons[0]._id).toBe(1);
      expect($scope.felons[0].name).toBe('test name');

    });

    it('should be able to create a new Felon when create() is called', function() {
      $httpBackend.expectPOST('/api/felons', {name: 'test name'}).respond(200, {name: 'a different felon'});

      expect($scope.felons.length).toBe(0);
      $scope.newFelon = {name: 'test name'};
      $scope.create($scope.newFelon);
      $httpBackend.flush();
      expect($scope.felons[0].name).toBe('a different felon');
      expect($scope.newFelon).toBe(null);

    });

    it('should be able to respond to a DELETE request when remove() is called', function() {
      felon = {_id: 1234, name: 'test name'};
      $scope.felons = [felon];
      $httpBackend.expectDELETE('/api/felons/' + felon._id).respond(200);

      $scope.remove(felon);
      $httpBackend.flush();
      expect($scope.felons.length).toBe(0);
    });

    it('should be able to respond to a PUT request when update() is called', function() {
      $scope.felons = [{_id: 1234, name: 'a testy name'}];
      $httpBackend.expectPUT('/api/felons/' + $scope.felons[0]._id, {_id: 1234, name: 'a testy name', tempName: '', editing: false}).respond(200);

      $scope.update($scope.felons[0]);
      $httpBackend.flush();
      expect($scope.felons[0].tempName).toBe('');
      expect($scope.felons[0].editing).toBe(false);
    });

    it('should be able to change editing to true by calling temp()', function() {
      felon = {name: 'a very testy name', tempName: '', editing: false};

      $scope.temp(felon);
      expect(felon.tempName).toBe('a very testy name');
      expect(felon.editing).toBe(true);
    });

    it('should be able to change editing back to false by calling cancel()', function() {
      felon = {name: '', tempName: 'an even more testy name', editing: true};

      $scope.cancel(felon);
      expect(felon.name).toBe('an even more testy name');
      expect(felon.editing).toBe(false);
    });
  });
});
