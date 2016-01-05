module.exports = function(app) {
  app.controller('booksController', ['$scope', '$http', function($scope, $http) {
    $scope.books = [];
    $scope.newBook = Object.create();

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
        $scope.newbook = null;
      }, function(err) {
        console.log(err.data);
      });
    };

    $scope.updateBook = function(book) {
      book.editing = false;
      $http.put('/api/books/' + book._id, book)
        .then(function(res) {
          console.log('Book has been updated');
        }, function(err) {
          $scope.erros.push('could not get book: ' + book.title + ' by ' + book.author);
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
  }]);
};
