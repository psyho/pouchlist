function onEscape() {
  return {
    restrict: 'A',
    scope: {
      onEscape: '&'
    },
    link: function($scope, $element) {
      $element.on('keyup', function(e) {
        if(e.which === 27) {
          $scope.$apply(function() {
            $scope.onEscape();
          });
        }
      });
    }
  };
}

module.exports = onEscape;
