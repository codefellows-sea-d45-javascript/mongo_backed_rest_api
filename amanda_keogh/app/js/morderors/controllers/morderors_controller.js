module.exports = function(app) {
  app.controller('IntroController', ['$scope', '$http', function($scope, $http) {
  $scope.intro = 'You thought Rock/Paper/Scissors was intense. You were wrong!';
  $scope.choice = 'Rock'; //default
  $scope.morderors = [];
  $scope.newMorderor = {};

  $scope.getAll = function() {
    $http.get('/api/morderors')
      .then(function(res) {
        console.log('get all');
        $scope.morderors = res.data;
      }, function(err) {
        console.log(err.data);
      });
  };

  $scope.get = function(morderor) {
    $http.get('/api/morderors/' + morderor._id)
      .then(function(res) {
        console.log('get one');
      }, function(err) {
        console.log(err.data);
      });
  };

  $scope.create = function(morderor) {
    $http.post('api/morderors', morderor)
      .then(function(res) {
        $scope.morderors.push(res.data);
        $scope.newMorderor = {};
      }, function(err) {
        console.log(err.data);
      });
  };

  $scope.update = function(morderor) {
    $http.put('/api/morderors/' + morderor._id, morderor)
      .then(function(res){
        console.log('morderor updated.');
      }, function(err) {
        console.log(err.data);
      })
  };

  $scope.remove = function(morderor) {
    $scope.morderors.splice($scope.morderors.indexOf(morderor), 1);
    $http.delete('api/morderors/' + morderor._id)
      .then(function(res) {
        console.log('morderor removed!');
      }, function(err) {
        console.log(err.data);
        $scope.getAll();
      })
  };

  $scope.refresh = function(morderor) {
    $http.get('api/morderors/' + morderor._id)
      .then(function(res) {
        console.log('refresh!');
        $scope.morderors[$scope.morderors.indexOf(morderor)] = res.data[0];
      }, function(err) {
        console.log(err.data);
      });
  }

}]);
}
