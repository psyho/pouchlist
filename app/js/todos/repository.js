todosRepository.$inject = ["$q"];
function todosRepository($q) {
  var list = [];

  function findById(id) {
    return list.filter(function(todo) {
      return id === todo._id;
    })[0];
  }

  return {
    all: function() {
      return $q.when(angular.copy(list));
    },

    completed: function() {
      var completed = list.filter(function(t) {
        return t.completed;
      });
      return $q.when(completed);
    },

    create: function(todo) {
      todo._id = new Date().toJSON();
      list.push(todo);
      return $q.when(todo);
    },

    delete: function(todo) {
      list = list.filter(function(t) {
        return t._id !== todo._id;
      });
      return $q.when(todo);
    },

    bulkDelete: function(todos) {
      list = list.filter(function(t) {
        return !todos.some(function(toRemove) {
          return toRemove._id === t._id;
        });
      });
      return $q.when(todos);
    },

    bulkUpdate: function(todos) {
      todos.forEach(function(todo) {
        var local = findById(todo._id) || {};
        angular.extend(local, todo);
      });

      return $q.when(todos);
    },

    update: function(todo) {
      var local = findById(todo._id) || {};
      angular.extend(local, todo);
      return $q.when(local);
    },
  };
}

module.exports = todosRepository;
