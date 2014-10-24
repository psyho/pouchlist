pouchdb.$inject = ["triggerApply"];
function pouchdb(triggerApply) {
  function wrapInObservable(db, method) {
    return function() {
      var promise = db[method].apply(db, arguments);

      return Rx.Observable.fromPromise(promise).map(function(response) {
        triggerApply();
        return response;
      });
    };
  }

  function delegate(db, method) {
    return db[method].bind(db);
  }

  function wrap(db) {
    return {
      allDocs: wrapInObservable(db, 'allDocs'),
      bulkDocs: wrapInObservable(db, 'bulkDocs'),
      put: wrapInObservable(db, 'put'),
      remove: wrapInObservable(db, 'remove'),
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
