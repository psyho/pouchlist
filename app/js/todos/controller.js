TodosCtrl.$inject = ["todosRepository", "$scope", "todos"];
function TodosCtrl(todosRepository, $scope, todos) {
  this.list = [];
  this.repo = todosRepository;

  var allCompleted = todos.map(function(list) {
    return list.all({completed: true});
  });

  todos.$assign($scope, 'list', this);
  allCompleted.$assign($scope, 'allCompleted', this);

  this.resetNewTodo();
  this.resetEditedTodo();
}

TodosCtrl.prototype = {
  add: function() {
    if(!this.newTodo.description) { return; }

    this.repo.create(this.newTodo).forEach(this.resetNewTodo.bind(this));
  },

  remove: function(todo) {
    this.repo.delete(todo);
  },

  removeCompleted: function() {
    this.repo.completed().forEach(function(completed) {
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

  resetNewTodo: function() {
    this.newTodo = {
      description: ''
    };
  }
};

module.exports = TodosCtrl;
