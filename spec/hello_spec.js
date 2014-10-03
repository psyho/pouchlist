describe("Greeter", function() {
  it("greets with salutation and name", function() {
    var greeter = new Greeter("Hello");

    expect(greeter.greet("World")).toEqual("Hello, World!");
  });
});
