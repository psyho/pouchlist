pouchdb.$inject = ["$q"];
function pouchdb($q) {
  function wrapPromise(db, method) {
    return function() {
      var promise = db[method].apply(db, arguments);
      return $q.when(promise);
    };
  }

  function delegate(db, method) {
    return db[method].bind(db);
  }

  function wrap(db) {
    return {
      allDocs: wrapPromise(db, 'allDocs'),
      bulkDocs: wrapPromise(db, 'bulkDocs'),
      put: wrapPromise(db, 'put'),
      remove: wrapPromise(db, 'remove'),
      changes: delegate(db, 'changes'),
    };
  };

  return function(name, opts) {
    var db = new PouchDB(name, opts);
    return wrap(db);
  };
}

module.exports = pouchdb;
