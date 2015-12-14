require(__dirname + '/../../app/js/entry.js');
require('angular-mocks');

describe('officer controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('OfficerAndFelonApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('OfficersController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.officers)).toBe(true);
  });

  describe('officer controller functions', function() {

    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('OfficersController', {$scope: $scope});
      $scope.officers = [];
    }));

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get response when getAllOfficers() is called', function() {
      $httpBackend.expectGET('/api/officers').respond(200, [{_id: 1, name: 'test name'}]);
      $scope.getAllOfficers();
      $httpBackend.flush();
      expect($scope.officers[0]._id).toBe(1);
      expect($scope.officers[0].name).toBe('test name');

    });

    it('should be able to create a new Officer when create() is called', function() {
      $httpBackend.expectPOST('/api/officers', {name: 'test name'}).respond(200, {name: 'a different officer'});

      expect($scope.officers.length).toBe(0);
      $scope.newOfficer = {name: 'test name'};
      $scope.create($scope.newOfficer);
      $httpBackend.flush();
      expect($scope.officers[0].name).toBe('a different officer');
      expect($scope.newOfficer).toBe(null);

    });

    it('should be able to respond to a DELETE request when remove() is called', function() {
      officer = {_id: 1234, name: 'test name'};
      $scope.officers = [officer];
      $httpBackend.expectDELETE('/api/officers/' + officer._id).respond(200);

      $scope.remove(officer);
      $httpBackend.flush();
      expect($scope.officers.length).toBe(0);
    });

    it('should be able to respond to a PUT request when update() is called', function() {
      $scope.officers = [{_id: 1234, name: 'a testy name'}];
      $httpBackend.expectPUT('/api/officers/' + $scope.officers[0]._id, {_id: 1234, name: 'a testy name', tempName: '', editing: false}).respond(200);

      $scope.update($scope.officers[0]);
      $httpBackend.flush();
      expect($scope.officers[0].tempName).toBe('');
      expect($scope.officers[0].editing).toBe(false);
    });

    it('should be able to change editing to true by calling temp()', function() {
      officer = {name: 'a very testy name', tempName: '', editing: false};

      $scope.temp(officer);
      expect(officer.tempName).toBe('a very testy name');
      expect(officer.editing).toBe(true);
    });

    it('should be able to change editing back to false by calling cancel()', function() {
      officer = {name: '', tempName: 'an even more testy name', editing: true};

      $scope.cancel(officer);
      expect(officer.name).toBe('an even more testy name');
      expect(officer.editing).toBe(false);
    });
  });
});
