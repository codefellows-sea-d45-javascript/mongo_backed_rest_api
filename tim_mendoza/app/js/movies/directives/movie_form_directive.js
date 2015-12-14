module.exports = function(app) {
  app.directive('movieForm', function() {
    return {
      restrict: 'AC',
      templateUrl: 'templates/movie_form_template.html',
      replace: true,
      scope: {
        newMovie: '=',
        editing: '=',
        create: '&',
        submitEdit: '&',
        cancelEdit: '&'
      }
    };
  });
};
