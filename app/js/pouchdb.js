pouchdb.$inject = ["triggerApply"];
function pouchdb(triggerApply) {
  function wrapCommand(db, method) {
    return function() {
      var promise = db[method].apply(db, arguments);

      return Rx.Observable.fromPromise(promise).map(function(response) {
        triggerApply();
        return response;
      });
    };
  }

  function wrapQuery(db, changes, method) {
    return function() {
      var args = arguments;
      var subject = new Rx.ReplaySubject(1);

      function fetch() {
        db[method].apply(db, args).then(function(result) {
          subject.onNext(result);
        });
      }

      changes.forEach(fetch);
      fetch();

      return subject.distinctUntilChanged();
    };
  }

  function delegate(db, method) {
    return db[method].bind(db);
  }

  function changesObservable(db) {
    var changes = db.changes({live: true, since: 'now'});
    var subject = new Rx.Subject();

    changes.on('change', function() {
      subject.onNext();
    });

    changes.on('error', function(e) {
      subject.onError(e);
    });

    return subject;
  }

  function wrap(db) {
    var changes = changesObservable(db).throttle(100);

    return {
      allDocs: wrapQuery(db, changes, 'allDocs'),
      bulkDocs: wrapCommand(db, 'bulkDocs'),
      put: wrapCommand(db, 'put'),
      remove: wrapCommand(db, 'remove'),
      changes: delegate(db, 'changes'),
      sync: delegate(db, 'sync'),
    };
  };

  return function(name, opts) {
    var db = new PouchDB(name, opts);
    return wrap(db);
  };
}

module.exports = pouchdb;
