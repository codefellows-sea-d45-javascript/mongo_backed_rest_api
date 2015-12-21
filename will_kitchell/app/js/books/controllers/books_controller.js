module.exports = function(app) {
  app.controller('booksController', ['$scope', '$http', function($scope, $http) {
    $scope.books = [];
    //$scope.newBook = Object.create();

    $scope.getAll = function() {
      $http.get('/api/books')
        .then(function(res) {
          $scope.books = res.data;
        }, function(err) {
          console.log(err.data);
        });
    };


  }]);
};


// var angular = window.angular;
// module.exports = function(app) {
//   app.controller('BearsController', ['$scope', '$http', 'cfResource', function($scope, $http, cfResource) {
//     $scope.bears = [];
//     $scope.errors = [];
//     $scope.defaults = {flavor: 'grizzly', fishPreference: 'Salmons'};
//     $scope.newBear = angular.copy($scope.defaults);
//     var bearsResource = cfResource('bears');

//     $scope.getAll = function() {
//       bearsResource.getAll(function(err, data) {
//         if (err) return err;

//         $scope.bears = data;
//       });
//     };

//     $scope.create = function(bear) {
//       bearsResource.create(bear, function(err, data){
//         if (err) return err;
//         $scope.bears.push(data);
//         $scope.newBear = angular.copy($scope.defaults);
//       });
//     };

//     $scope.update = function(bear) {
//       bear.editing = false;
//       $http.put('/api/bears/' + bear._id, bear)
//         .then(function(res) {
//           console.log('this bear has a new identity (placed in bear witness protection)');
//         }, function(err) {
//           $scope.errors.push('could not get bear: ' + bear.name + ' to bear trial');
//           console.log(err.data);
//         });
//     };

//     $scope.remove = function(bear) {
//       $scope.bears.splice($scope.bears.indexOf(bear), 1);
//       $http.delete('/api/bears/' + bear._id)
//         .then(function(res) {
//           console.log('totes cool, bear murdered');
//         }, function(err) {
//           console.log(err.data);
//           $scope.errors.push('could not murderererer bearzzz: ' + bear.name);
//           $scope.getAll();
//         });
//     };
//   }]);
// };
