triggerApply.$inject = ["$timeout"];
function triggerApply($timeout) {
  var trigger;
  var observable = Rx.Observable.create(function(observer) {
    var disposed = false;

    trigger = function() {
      if(!disposed) {
        observer.onNext();
      }
    };

    return function() {
      disposed = true;
    };
  });

  observable.throttle(100).forEach(function() {
    $timeout(angular.noop);
  });

  return trigger;
}

module.exports = triggerApply;
