var app = angular.module('todomvc', ['ng']);

app.factory('todosRepository', require('./todos/repository.js'));
app.controller('TodosCtrl', require('./todos/controller.js'));
app.directive('onEscape', require('./on_escape.js'));
