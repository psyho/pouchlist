function Greeter(salutation) {
  this.salutation = salutation;
}

Greeter.prototype.greet = function(name) {
  return this.salutation + ", " + name + "!";
};

module.exports = Greeter;
