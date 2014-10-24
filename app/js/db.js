db.$inject = ["pouchdb", "$rootScope"];
function db(pouchdb, $rootScope) {
  var db = pouchdb("todos");

  db.sync('http://localhost:5984/todos', {live: true});

  return db;
}

module.exports = db;
