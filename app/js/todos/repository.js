todosRepository.$inject = ["$q", "db"];
function todosRepository($q, db) {
  function extractDocs(response) {
    return response.rows.map(function(row) {
      return row.doc;
    });
  }

  function filter(predicate) {
    return function(arr) {
      return arr.filter(predicate);
    };
  }

  function not(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  }

  function isCompleted(todo) {
    return todo.completed;
  }

  var repository = {
    all: function() {
      return db.allDocs({include_docs: true}).map(extractDocs);
    },

    completed: function() {
      return repository.all().map(filter(isCompleted));
    },

    active: function() {
      return repository.all().map(filter(not(isCompleted)));
    },

    create: function(todo) {
      todo._id = new Date().toJSON();
      return db.put(todo);
    },

    delete: function(todo) {
      return db.remove(todo);
    },

    bulkDelete: function(todos) {
      var observables = todos.map(function(todo) {
        return db.remove(todo);
      });
      return Rx.Observable.zip(observables);
    },

    bulkUpdate: function(todos) {
      return db.bulkDocs(todos);
    },

    update: function(todo) {
      return db.put(todo);
    },
  };

  return repository;
}

module.exports = todosRepository;
