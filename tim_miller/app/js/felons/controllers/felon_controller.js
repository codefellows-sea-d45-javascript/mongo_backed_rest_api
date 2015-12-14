module.exports = function(app) {
  app.controller('FelonsController', ['$scope', '$http', 'restFunctions', function($scope, $http, restFunctions) {
    $scope.felons = [];
    $scope.errors = [];
    $scope.newFelon = null;
    var felonResource = restFunctions('felons');

    $scope.getAllFelons = function() {
      felonResource.getAll(function(err, data) {
        if (err) return err;

        $scope.felons = data;
      });
    };

    $scope.create = function(felon) {

      felonResource.create(felon, function(err, data) {
        if (err) return err;
        $scope.felons.push(data);
        $scope.newFelon = null;
      });
    };

    $scope.remove = function(felon) {
      felonResource.remove($scope.felons, felon, function(err, data) {
        if (err) {
          $scope.erros.push('Could not delete Felon ' + felon.name);
          $scope.getAllFelons();
        }
      });
    };

    $scope.update = function(felon) {
      felonResource.update(felon, function(err, data) {
        if (err) {
          $scope.errors.push('could not get felon: ' + felon.name);
        }
        console.log('this felon has a new name');
      });
    };

    $scope.temp = function(felon) {
      felonResource.temp(felon);
    };

    $scope.cancel = function(felon) {
      felonResource.cancel(felon);
    };

  }]);
};
