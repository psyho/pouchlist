todosRepository.$inject = ["$q", "$rootScope"];
function todosRepository($q, $rootScope) {
  var list = [];

  function findById(id) {
    return list.filter(function(todo) {
      return id === todo._id;
    })[0];
  }

  function triggerChangeEvent() {
    $rootScope.$broadcast('todos:changed');
  }

  return {
    onChange: function($scope, fn) {
      $scope.$on('todos:changed', fn);
    },

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
      triggerChangeEvent();
      return $q.when(todo);
    },

    delete: function(todo) {
      list = list.filter(function(t) {
        return t._id !== todo._id;
      });
      triggerChangeEvent();
      return $q.when(todo);
    },

    bulkDelete: function(todos) {
      list = list.filter(function(t) {
        return !todos.some(function(toRemove) {
          return toRemove._id === t._id;
        });
      });
      triggerChangeEvent();
      return $q.when(todos);
    },

    bulkUpdate: function(todos) {
      todos.forEach(function(todo) {
        var local = findById(todo._id) || {};
        angular.extend(local, todo);
      });

      triggerChangeEvent();
      return $q.when(todos);
    },

    update: function(todo) {
      var local = findById(todo._id) || {};
      angular.extend(local, todo);
      triggerChangeEvent();
      return $q.when(local);
    },
  };
}

module.exports = todosRepository;
