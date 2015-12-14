module.exports = function(app) {
  app.controller('BustedController', ['$scope', '$http', function($scope, $http) {

    $scope.busted = function() {
        $http.get('/api/busted')
          .then(function(res) {
            $scope.outcome = res.data;

          }, function(err) {
            console.log(err.data);
        });
      };
  }]);
};
