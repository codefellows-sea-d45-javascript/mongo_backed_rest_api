module.exports = function(app) {
  app.directive('officerTranscludeDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: 'js/templates/officer_transclude_directive.html',
      transclude: true
    };
  });
};
