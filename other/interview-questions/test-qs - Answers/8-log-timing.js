/*

Consider the two functions below. 
Will they both return the same thing? 
Why or why not? 
Consider browser event loops...

*/

function twoFunc() {
    console.log("1"); 
    setTimeout(function(){console.log("2")}, 1000); 
    setTimeout(function(){console.log("3")}, 0); 
    console.log("4");
    console.log("5");
    console.log("6");
    console.log("7");
    console.log("8");
    console.log("9");
    console.log("10");
    console.log("11");
};

twoFunc();



// 1
// 4
// 3
// (wait a 1 second)
// 2

// If you call setTimeout() with a time of 0 ms, the function you specify is not invoked right away. 
// Instead, it is placed on a queue to be invoked “as soon as possible” after any currently pending event handlers finish running.