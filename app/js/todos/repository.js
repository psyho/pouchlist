todosRepository.$inject = ["$q", "$rootScope", "pouchdb"];
function todosRepository($q, $rootScope, pouchdb) {
  var db = pouchdb("todos");

  function extractDocs(response) {
    return response.rows.map(function(row) {
      return row.doc;
    });
  }

  function filter(predicate) {
    return function(docs) {
      return docs.filter(predicate);
    };
  }

  function reject(predicate) {
    return filter(function() {
      return !predicate.apply(this, arguments);
    });
  }

  function isCompleted(todo) {
    return todo.completed;
  }

  function triggerChangeEvent(value) {
    $rootScope.$broadcast('todos:changed');
    return value;
  }

  var repository = {
    onChange: function($scope, fn) {
      $scope.$on('todos:changed', fn);
    },

    all: function() {
      return db.allDocs({include_docs: true}).then(extractDocs);
    },

    completed: function() {
      return repository.all().then(filter(isCompleted));
    },

    active: function() {
      return repository.all().then(reject(isCompleted));
    },

    create: function(todo) {
      todo._id = new Date().toJSON();
      return db.put(todo).then(triggerChangeEvent);
    },

    delete: function(todo) {
      return db.remove(todo).then(triggerChangeEvent);
    },

    bulkDelete: function(todos) {
      var promises = todos.map(function(todo) {
        return db.remove(todo);
      });
      return $q.all(promises).then(triggerChangeEvent);
    },

    bulkUpdate: function(todos) {
      return db.bulkDocs(todos).then(triggerChangeEvent);
    },

    update: function(todo) {
      return db.put(todo).then(triggerChangeEvent);
    },
  };

  return repository;
}

module.exports = todosRepository;
