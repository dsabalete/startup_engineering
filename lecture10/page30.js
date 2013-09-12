#!/bin/env node

console.log("*** The concept of self-executing functions ***");

// 1. Basic self-executing functions for encapsulation
//
// Suppose you have some JS code like this:
var foo = "inner";
console.log(foo);

// You worry that the external world may also have defined a foo variable.
// To protect your code, you can encapsulte it by putting it in a 
/// self-executing function.
var foo = "outer";
(function(){
    var foo = "inner";
    console.log(foo);
})();
console.log(foo);

// This will print:
/*
inner
outer
*/

console.log("--------------");

// Let's break this down bit by bit. The inside is just an anonymous 
// function definition. Let's assign it to a variable.
var anon = function() {
    var foo = "inner";
    console.log(foo);
};

// We enclose this fucntion definition in parentheses, and the immediately
// execute it bya adding another two parens at the end. We also need a 
// semicolon as the expression is ending.
(function() {
    var foo = "inner";
    console.log(foo);
})();

console.log("--------------");

// 2. Passing in variables to a self-executing function
//
// Now that we've set up a wall, we can do something more sophisticated by
// passing in specific variables from the enclosing scope.
var bar = "allowed";
(function(aa) {
    var foo = "inner";
    console.log(foo + " " + aa);
})(bar);

// This prints
/*
inner allowed
*/

console.log("--------------");

// 3. Passing in and receiving variables from a self-executing function.
//
// Now we'll return an object as well, converting the inside into a proper
// function.
var bar = "allowed";
var result = (function(aa) {
    var foo = "inner";
    var out = foo + " " + aa;
    console.log(out);
    return {"val": out};
})(bar);

// This prints
/*
{ val: 'inner allowed' }
*/