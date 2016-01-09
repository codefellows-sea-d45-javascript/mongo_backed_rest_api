module.exports = function(app) {
  app.controller('booksController', ['$scope', '$http', function($scope, $http) {
    $scope.books = [];
    $scope.newBook = {};

    $scope.getAll = function() {
      $http.get('/api/books')
        .then(function(res) {
          $scope.books = res.data;
        }, function(err) {
          console.log(err.data);
        });
    };

    $scope.createBook = function(book) {
      $http.post('/api/books', book)
      .then(function(res) {
        $scope.books.push(res.data);
        $scope.newBook = null;
      }, function(err) {
        console.log(err.data);
      });
    };

    $scope.updateBook = function(book) {
      book.editing = false;
      if(book.recommended) book.recommended = false;
      else book.recommended = true;
      $http.put('/api/books/' + book._id, book)
        .then(function(res) {
          console.log('book recommended status updated.');
        }, function(err) {
          console.log(err.data);
        });
    };

    $scope.deleteBook = function(book) {
      $scope.books.splice($scope.books.indexOf(book), 1);
      $http.delete('/api/books/' + book._id)
        .then(function(res) {
          console.log('Book was removed from the databas... err shelf');
        }, function(err) {
          console.log(err.data)
          $scope.getAll();
        });
    };

    $scope.cancelupdateBook = function(book) {
      $http.get('/api/books/' + book._id)
      .then(function(res) {
        console.log('Cancel Update!');
        $scope.books[$scope.books.indexOf(book)] = res.data[0];
      }, function(err) {
        console.log(err.data);
      });
    };
  }]);
};
