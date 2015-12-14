module.exports = function(app) {
  app.controller('OfficersController', ['$scope', '$http', 'restFunctions', function($scope, $http, restFunctions) {
    $scope.officers = [];
    $scope.errors = [];
    $scope.newOfficer = null;
    var officerResource = restFunctions('officers');

    $scope.getAllOfficers = function() {
      officerResource.getAll(function(err, data) {
        if (err) return err;

        $scope.officers = data;
      });
    };

    $scope.create = function(officer) {

      officerResource.create(officer, function(err, data) {
        if (err) return err;
        $scope.officers.push(data);
        $scope.newOfficer = null;
      });
    };

    $scope.remove = function(officer) {
      officerResource.remove($scope.officers, officer, function(err, data) {
        if (err) {
          $scope.errors.push('Could not delete Officer ' + officer.name);
          $scope.getAllOfficers();
        }
      });
    };

    $scope.update = function(officer) {
      officerResource.update(officer, function(err, data) {
        if (err) {
          $scope.errors.push('could not get officer: ' + officer.name);
        }
        console.log('this officer has a new name');
      });
    };

    $scope.temp = function(officer) {
      officerResource.temp(officer);
    };

    $scope.cancel = function(officer) {
      officerResource.cancel(officer);
    };

  }]);
};
