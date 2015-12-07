require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('messages controller', function(){
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('SelfDestructApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it("should be able to create a controller", function(){
    var controller = $ControllerConstructor('MessagesController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.messages)).toBe(true);
  });

  describe('REST request functions', function(){
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope){
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('MessagesController', {$scope: $scope})
    }));

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an array to message with a GET all', function(){
      $httpBackend.expectGET('/api/messages').respond(200, [{_id:1, oneWordTitle: "test message"}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.messages[0].oneWordTitle).toBe('test message');
    });

    it('should be able to create a message', function(){
      $httpBackend.expectPOST('/api/messages', {oneWordTitle: "testMessage1", secretToRead:"test1", priority: 1, "views":0, "destructMessage":"You only get to read this 3 times!"}).respond(200, {oneWordTitle: "testMessage2", secretToRead:"test2", priority: 1});


      expect($scope.messages.length).toBe(0);
      expect($scope.newMessage).toEqual($scope.defaults);

      $scope.newMessage.oneWordTitle = "testMessage1";
      $scope.newMessage.secretToRead ="test1";
      $scope.newMessage.priority = 1;
      $scope.create($scope.newMessage);
      $httpBackend.flush();

      expect($scope.messages[0].oneWordTitle).toBe("testMessage2");
      expect($scope.newMessage).toEqual($scope.defaults);
    });
  });
});
