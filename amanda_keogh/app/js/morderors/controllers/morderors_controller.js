module.exports = function(app) {
  app.controller('IntroController', ['$scope', '$http', function($scope, $http) {
  $scope.intro = 'You thought Rock/Paper/Scissors was intense. You were wrong!';
  $scope.choice = 'Rock'; //default
  $scope.morderors = ['hi!'];

  $scope.get = function() {
    $http.get('/api/morderors/')
    .then(function(res) {
      console.log('get');
      $scope.morderors = res.data;
    }, function(err) {
      console.log(err.data);
    });
  }


}]);
}
