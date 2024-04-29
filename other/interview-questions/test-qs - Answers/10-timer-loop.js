/*
    What is the expected result of the code below
*/

for (var i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log(1 + i);
    }, (5000 + i));
}


/*

- timeouts run asynchronously, called at same time. only 1ms difference between the 3. Seem to happen at once
- if var was used you'd expect "1 2 3" but since let is used "4 4 4"
- scoping difference. Var->immediate function body (function scoped) and let->immediate closing block (block scoped)
- with let, "i" variable has updated to 3 outside of timer so by the time the function runs it looks out for reference and logs 4 (3+1)
- with var, "i" variable function sees "i" as incremented by 1 and holds onto that value to log. so.. 1 (1+0), 2 (1+1), 3 (1+2)  
*/