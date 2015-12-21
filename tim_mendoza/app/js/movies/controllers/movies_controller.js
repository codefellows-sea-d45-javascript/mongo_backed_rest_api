module.exports = function(app) {
  app.controller('MoviesController', ['$scope', '$http', 'restResource', function($scope, $http, restResource) {
    $scope.movies = [];
    $scope.editing = false;
    var moviesResource = restResource('movies');

    $scope.getAll = function() {
      moviesResource.get(function(err, data) {
        if (err) return console.log(err);
        $scope.movies = data;
      });
    };

    $scope.create = function(newMovie) {
      if (newMovie.actors) newMovie.actors = newMovie.actors.split(', ');
      moviesResource.create(newMovie, function(err, data) {
        if (err) return console.log(err);
        $scope.movies.push(data);
        $scope.newMovie = null;
      });
    };

    $scope.remove = function(movie) {
      moviesResource.delete(movie, function(err, data) {
        if (err) return console.log(err);
        $scope.movies.splice($scope.movies.indexOf(movie), 1);
      });
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
      moviesResource.update(movie, function(err, data) {
        if (err) return console.log(err);
        console.log('movie changed');
      });
    };
  }]);
};
