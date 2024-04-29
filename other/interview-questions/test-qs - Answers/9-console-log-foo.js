/*

    What will the code below output to the console and why?

*/

var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
myObject.func();


// "this" & "self" are the same sooo...

// outer func:  this.foo = bar
// outer func:  self.foo = bar

// then a self called function BUT "this" is not defined in scope of new function. "self" still refers to outer variable though
// inner func:  this.foo = undefined
// inner func:  self.foo = bar