TodosCtrl.$inject = ["todosRepository"];
function TodosCtrl(todosRepository) {
  this.repo = todosRepository;

  this.resetNewTodo();
  this.resetEditedTodo();
  this.reloadList();
}

TodosCtrl.prototype = {
  add: function() {
    if(!this.newTodo.description) { return; }

    this.repo.create(this.newTodo)
      .then(this.resetNewTodo.bind(this))
      .then(this.reloadList.bind(this));
  },

  remove: function(todo) {
    this.repo.delete(todo)
      .then(this.reloadList.bind(this));
  },

  removeCompleted: function() {
    this.repo.completed()
      .then(this.removeAll.bind(this))
      .then(this.reloadList.bind(this));
  },

  removeAll: function(todos) {
    return this.repo.bulkDelete(todos);
  },

  todoCompleted: function(todo) {
    this.repo.update(todo)
      .then(this.reloadList.bind(this));
  },

  toggleCompleted: function() {
    var completed = this.allCompleted;

    this.list.forEach(function(todo) {
      todo.completed = completed;
    });

    this.resetAllCompleted();

    this.repo.bulkUpdate(this.list)
      .then(this.reloadList.bind(this));
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
    this.repo.update(this.editedTodo)
      .then(this.reloadList.bind(this));
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
    this.repo.all().then(function(list) {
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
