function TodosCtrl() {
  this.resetNewTodo();
  this.resetEditedTodo();

  this.resetList([]);
}

TodosCtrl.prototype = {
  add: function() {
    this.newTodo._id = new Date().toJSON();
    this.resetList(this.list.concat([this.newTodo]));
    this.resetNewTodo();
  },

  remove: function(todo) {
    var newList = this.list.filter(function(t) {
      return t !== todo;
    });
    this.resetList(newList);
  },

  removeCompleted: function() {
    var newList = this.list.filter(function(todo) {
      return !todo.completed;
    });
    this.resetList(newList);
  },

  toggleCompleted: function() {
    var completed = this.allCompleted;

    this.list.forEach(function(todo) {
      todo.completed = completed;
    });

    this.resetAllCompleted();
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
    this.updateById(this.editedTodo._id, {description: this.editedTodo.description});
    this.resetEditedTodo();
  },

  updateById: function(id, changes) {
    this.list.forEach(function(todo) {
      if(todo._id === id) {
        angular.extend(todo, changes);
      }
    });
  },

  resetEditedTodo: function() {
    this.editedTodo = {};
  },

  resetAllCompleted: function() {
    this.allCompleted = (this.completedCount() === this.list.length);
  },

  resetList: function(list) {
    this.list = list;
    this.resetAllCompleted();
  },

  resetNewTodo: function() {
    this.newTodo = {
      description: ''
    };
  }
};

module.exports = TodosCtrl;
