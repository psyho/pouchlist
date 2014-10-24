Rx.Observable.fromScopeEvent = function($scope, event) {
  return Rx.Observable.create(function(observer) {
    var disposed = false;

    $scope.$on(event, function() {
      if(!disposed) {
        observer.onNext();
      }
    });

    $scope.$on("$destroy", function() {
      if(!disposed) {
        observer.onCompleted();
        disposed = true;
      }
    });

    return function() {
      disposed = true;
    };
  });
};

Rx.Observable.prototype.$assign = function($scope, name, object) {
  var $destroy = Rx.Observable.fromScopeEvent($scope, '$destroy');
  object = object || $scope;

  this.takeUntil($destroy).forEach(function(value) {
    $scope.$apply(function() {
      object[name] = value;
    });
    return this;
  });
};
