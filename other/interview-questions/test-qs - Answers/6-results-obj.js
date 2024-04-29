/*

    Describe a process to loop through the results
    object and print the message of an item if the
    value of the item is greater than 1

*/

var results = {
    one: {
        value: 1,
        message: 'value is 1'
    },
    two: {
        value: 2,
        message: 'value is 2'
    },
    three: {
        value: 3,
        message: 'value is 3'
    }
};

/*

    Expected Output
    value is 2
    value is 3

*/

// Using a for...in loop
// Object.keys method
// Object.values method
// Object.entries method

// for (var [key, value] of Object.entries(results)) {
//     if (value.num > 1){
//         console.log(value.text)
//     }
// }

// for (var blah of Object.keys(results)){
//     if (results[blah].num > 1){
//         console.log(shit[blah])
//     }
// }

// for (var blah in results){
//     if (results[blah].num > 1){
//         console.log(shit[blah].text)
//     }
// }

// const keys = Object.keys(results);
// keys.forEach((key, index) => {
//     console.log(`${key}: ${courses[key]}`);
// });


Object.values(results).forEach(val => console.log(val));


// for (var itm in results){
//     console.log(itm)
// }