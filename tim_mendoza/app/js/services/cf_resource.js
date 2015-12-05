/*module.exports = function(app) {
  app.factory('cf', ['$http', function($http) {
    return function(resourceName) {
      return {
        getAll: function(callback) {
          $http.get('/api/' + resourceName)
        }
      }
    };
  }]);
};
