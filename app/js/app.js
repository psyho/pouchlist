var app = angular.module('todomvc', ['ng']);

app.controller('TodosCtrl', require('./todos/controller.js'));
app.directive('onEscape', require('./on_escape.js'));
