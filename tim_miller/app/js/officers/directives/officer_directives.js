module.exports = function(app) {
  app.directive('officerDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: 'js/templates/officer_directive_template.html',
      scope: {//= is always passed by reference
        officer: '=',
      }
    };
  });
};
