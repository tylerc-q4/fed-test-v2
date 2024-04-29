/*
    What is the expected result of the code below
*/

for (let i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log(1 + i);
    }, (5000 + i));
}