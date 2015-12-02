module.exports = function(app) {
  app.controller('MoviesController', ['$scope', '$http', function($scope, $http) {
    $scope.movies = [];

    $scope.getAll = function() {
      $http.get('/api/movies').then(
        function(res) {
          $scope.movies = res.data;
        },
        function(res) {
          console.log(res);
        }
      );
    };

    $scope.create = function(newMovie) {
      if (newMovie.actors) newMovie.actors = newMovie.actors.split(', ');
      $http.post('/api/movies', newMovie).then(
        function(res) {
          $scope.movies.push(res.data);
        },
        function(res) {
          console.log(res);
        }
      );
    };

    $scope.remove = function(movie) {
      $http.delete('/api/movies' + movie._id).then(
        function(res) {
          $scope.getAll();
        },
        function(res) {
          console.log(res);
        }
      );
    };
  }]);
};
