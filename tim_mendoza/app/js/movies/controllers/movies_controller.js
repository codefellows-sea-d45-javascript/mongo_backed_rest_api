module.exports = function(app) {
  app.controller('MoviesController', ['$scope', '$http', function($scope, $http) {
    $scope.movies = [];
    $scope.editing = false;

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
          $scope.newMovie = {};
        },
        function(res) {
          console.log(res);
        }
      );
    };

    $scope.remove = function(movie) {
      $http.delete('/api/movies/' + movie._id).then(
        function(res) {
          $scope.getAll();
        },
        function(res) {
          console.log(res);
        }
      );
    };

    $scope.edit = function(movie) {
      $scope.movies.splice($scope.movies.indexOf(movie), 1);
      $scope.editing = true;
      $scope.tempMovie = angular.copy(movie);
      $scope.newMovie = movie;
    };

    $scope.cancelEdit = function() {
      $scope.editing = false;
      $scope.newMovie = {};
      $scope.movies.push($scope.tempMovie);
    };

    $scope.submitEdit = function(movie) {
      $scope.editing = false;
      $scope.movies.push(movie);
      $scope.newMovie = {};
      $http.put('/api/movies/' + movie._id, movie).then(
        function(res) {
          console.log('movie changed');
        },
        function(res) {
          console.log(res);
        }
      );
    };

  }]);
};
