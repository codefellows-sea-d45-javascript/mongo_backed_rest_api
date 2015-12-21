module.exports = function(app) {
  app.directive('listDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: 'js/templates/list_directive_template.html',
      transclued: true,
      scope: {
        resource: '=',
        title: '@'
      }
    };
  });
};
