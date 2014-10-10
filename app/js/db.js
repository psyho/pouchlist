db.$inject = ["pouchdb", "$rootScope"];
function db(pouchdb, $rootScope) {
  var db = pouchdb("todos");

  db.changes({live: true, since: 'now'}).on('change', function() {
    $rootScope.$broadcast('db:changed');
  });

  db.onChange = function($scope, callback) {
    $scope.$on('db:changed', callback);
  };

  return db;
}

module.exports = db;
