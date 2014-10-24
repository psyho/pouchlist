function fetch(name) {
  fetcher.$inject = ["todosRepository"];
  function fetcher(todosRepository) {
    return todosRepository[name]();
  }
  return fetcher;
}

var all = {
  name: 'All',
  url: '/',
  get: fetch('all')
};

var active = {
  name: 'Active',
  url: '/active',
  get: fetch('active')
};

var completed = {
  name: 'Completed',
  url: '/completed',
  get: fetch('completed')
};

module.exports = [all, active, completed];
