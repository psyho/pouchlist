TodosCtrl.$inject = ["todosRepository", "$scope", "fetchTodos"];
function TodosCtrl(todosRepository, $scope, fetchTodos) {
  this.list = [];
  this.repo = todosRepository;
  this.fetchTodos = fetchTodos;

  this.resetNewTodo();
  this.resetEditedTodo();
  this.reloadList();

  this.repo.onChange($scope, this.reloadList.bind(this));
}

TodosCtrl.prototype = {
  add: function() {
    if(!this.newTodo.description) { return; }

    this.repo.create(this.newTodo)
      .then(this.resetNewTodo.bind(this));
  },

  remove: function(todo) {
    this.repo.delete(todo);
  },

  removeCompleted: function() {
    this.repo.completed().then(function(completed) {
      return this.repo.bulkDelete(completed);
    }.bind(this));
  },

  todoCompleted: function(todo) {
    this.repo.update(todo);
  },

  toggleCompleted: function() {
    var completed = this.allCompleted;

    this.list.forEach(function(todo) {
      todo.completed = completed;
    });

    this.repo.bulkUpdate(this.list);
  },

  activeCount: function() {
    return this.list.length - this.completedCount();
  },

  completedCount: function() {
    return this.list.filter(function(todo) {
      return todo.completed;
    }).length;
  },

  startEditing: function(todo) {
    this.editedTodo = angular.copy(todo);
  },

  isEditing: function(todo) {
    return this.editedTodo._id == todo._id;
  },

  cancelEditing: function() {
    this.resetEditedTodo();
  },

  updateTodo: function() {
    this.repo.update(this.editedTodo);
    this.resetEditedTodo();
  },

  resetEditedTodo: function() {
    this.editedTodo = {};
  },

  resetAllCompleted: function() {
    this.allCompleted = (this.completedCount() === this.list.length);
  },

  reloadList: function() {
    var self = this;
    this.fetchTodos().then(function(list) {
      self.list = list;
      self.resetAllCompleted();
    });
  },

  resetNewTodo: function() {
    this.newTodo = {
      description: ''
    };
  }
};

module.exports = TodosCtrl;
