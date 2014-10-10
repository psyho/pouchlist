var app = angular.module('todomvc', ['ng', 'ngRoute']);

app.constant('filters', require('./todos/filters.js'));

app.factory('todosRepository', require('./todos/repository.js'));
app.controller('TodosCtrl', require('./todos/controller.js'));
app.controller('FiltersCtrl', require('./todos/filters_controller.js'));
app.directive('onEscape', require('./on_escape.js'));

app.config(require('./routes'));
