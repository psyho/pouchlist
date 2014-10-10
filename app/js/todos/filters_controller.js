FiltersCtrl.$inject = ["$location", "filters"];
function FiltersCtrl($location, filters) {
  this.$location = $location;
  this.list = filters;
}

FiltersCtrl.prototype = {
  isActive: function(filter) {
    return this.$location.path() === filter.url;
  }
};

module.exports = FiltersCtrl;
