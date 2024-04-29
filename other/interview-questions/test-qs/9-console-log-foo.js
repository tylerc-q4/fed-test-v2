/*
    What will the code below output to the console and why?
*/

var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("1 = " + this.foo);
        console.log("2 = " + self.foo);
        (function() {
            console.log("3 = " + this.foo);
            console.log("4 = " + self.foo);
        }());
    }
};
myObject.func();