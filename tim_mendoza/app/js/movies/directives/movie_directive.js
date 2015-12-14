module.exports = function(app) {
  app.directive('movieDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/movie_directive_template.html',
      scope: {
        movie: '=',
        edit: '&',
        remove: '&',
        editing: '='
      }
    };
  });
};
