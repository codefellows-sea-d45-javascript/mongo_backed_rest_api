module.exports = function(app){
  app.controller("MessagesController", ['$scope', "$http", function($scope, $http){
    $scope.messages = [];
    $scope.errors = [];
    var defaults = {views: 0, destructMessage: "You only get to read this 3 times!" };
    $scope.newMessage = Object.create(defaults);
    saveMsg = {};


    $scope.getAll = function(){
      $http.get('/api/messages')
        .then(function(res){
          $scope.messages = res.data;
        }, function(err){
          console.log(err.data);
      });
    };

    $scope.create = function(message){
      $http.post('/api/messages', message)
      .then(function(res){
        $scope.messages.push(res.data);
        $scope.newMessage = Object.create(defaults);
        console.log("Message created");
      }, function(err){
        console.log(err.data)
      });
    };

    $scope.update = function(message){
      message.editing = false;
      $http.put('api/messages/' + message._id, message)
      .then(function(res){
        console.log('Message has been updated')
      }, function(err){
        $scope.errors.push("Could not edit "+ message.oneWordTitle);
        console.log(err.data);
      });
    };

    $scope.editMsg = function(message){
      saveMsg.oneWordTitle = message.oneWordTitle;
      saveMsg.secretToRead = message.secretToRead;
      saveMsg.priority = saveMsg.priority;

      message.editing = true;
    };

    $scope.cancelEdit = function(message){
      message.editing = false;
      message.oneWordTitle = saveMsg.oneWordTitle;
      message.secretToRead = saveMsg.secretToRead;
      message.priority = saveMsg.priority;

    };

    $scope.remove = function(message){
      $scope.messages.splice($scope.messages.indexOf(message), 1);
      $http.delete('/api/messages/' + message._id)
        .then(function(res){
          console.log("Message was deleted but not self destructed");
        }, function(err){
          console.log(err.data);
          $scope.errors.push('Could not delete message ' + message.oneWordTitle);
          $scope.getAll();
        });
    };
  }]);
};
