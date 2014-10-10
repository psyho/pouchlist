todosRepository.$inject = ["$q", "db"];
function todosRepository($q, db) {
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

  var repository = {
    onChange: db.onChange,

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
      return db.put(todo);
    },

    delete: function(todo) {
      return db.remove(todo);
    },

    bulkDelete: function(todos) {
      var promises = todos.map(function(todo) {
        return db.remove(todo);
      });
      return $q.all(promises);
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
