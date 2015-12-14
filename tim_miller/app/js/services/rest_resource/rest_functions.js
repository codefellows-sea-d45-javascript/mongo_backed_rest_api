var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data);
  };
};

var handleFail = function(callback) {
  return function(err) {
    console.log(err);
    callback(err.data);
  };
};

module.exports = function(app) {

  app.factory('restFunctions', ['$http', function($http) {

    return function(resourceName) {
      var resource = {};
      resource.getAll = function(callback) {
        $http.get('/api/' + resourceName)
          .then(handleSuccess(callback), handleFail(callback));
      };

      resource.create = function(data, callback) {
        $http.post('/api/' + resourceName, data)
          .then(handleSuccess(callback), handleFail(callback));
      };

      resource.remove = function(collection, data, callback) {
        collection.splice(collection.indexOf(data), 1);
        $http.delete('/api/' + resourceName + '/' + data._id)
          .then(handleSuccess(callback), handleFail(callback));
      };

      resource.update = function(data, callback) {
        data.tempName = '';
        data.editing = false;
        $http.put('/api/' + resourceName + '/' + data._id, data)
          .then(handleSuccess(callback), handleFail(callback));
      };

      resource.temp = function(data) {
        data.editing = true;
        data.tempName = data.name;
      };

      resource.cancel = function(data) {
        data.editing = false;
        data.name = data.tempName;
      };

      return resource;
    };
  }]);
};
