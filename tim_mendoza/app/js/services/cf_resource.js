function handleSuccess(callback) {
  return function(res) {
    callback(null, res.data);
  };
}

function handleFail(callback) {
  return function(res) {
    callback(res.data);
  };
}

module.exports = function(app) {
  app.factory('restResource', ['$http', function($http) {
    return function(resourcePath) {
      var resource = {};
      resource.get = function(callback) {
        $http.get('/api/' + resourcePath).then(
          handleSuccess(callback), handleFail(callback)
        );
      };
      resource.create = function(data, callback) {
        $http.post('/api/' + resourcePath, data).then(
          handleSuccess(callback), handleFail(callback)
        );
      };
      resource.delete = function(data, callback) {
        $http.delete('/api/' + resourcePath + '/' + data._id).then(
          handleSuccess(callback), handleFail(callback)
        );
      };
      resource.update = function(data, callback) {
        $http.put('/api/' + resourcePath + '/' + data._id, data).then(
          handleSuccess(callback), handleFail(callback)
        );
      };
      return resource;
    };
  }]);
};
