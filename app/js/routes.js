routes.$inject = ["$routeProvider", "$locationProvider", "filters"];
function routes($routeProvider, $locationProvider, filters) {
  $locationProvider.html5Mode(false);

  filters.forEach(function(filter) {
    $routeProvider.when(filter.url, {
      controller: 'TodosCtrl',
      controllerAs: 'todos',
      templateUrl: '/todos.html',
      resolve: {
        todos: filter.get
      }
    });
  });

  $routeProvider.otherwise('/');
}

module.exports = routes;
