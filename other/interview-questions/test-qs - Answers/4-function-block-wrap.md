What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?


-The purpose of wrapping is to a namespace and control the visibility of member functions. It wraps the code inside a function scope and decreases clashing with other libraries.
- employed by many popular JavaScript libraries (jQuery, Node.js, etc.). 
- creates a closure around the entire contents of the file
- creates a private namespace and helps avoid potential name clashes between different JavaScript modules and libraries.
- allows for an easily referenceable alias for a global variable. 