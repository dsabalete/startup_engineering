#!/bin/env node
//
// 1. Partial function application in JS
//
// The concept of partial function application (aka currying, named after 
// Haskell Curry the mathematician).
var sq = function(x) { return x * x;};
var loop = function(n, fn) {
    var out = [];
    for (var i = 0; i < n; i++) {
        out.push(fn(i));
    }
    return out;
};

// We can use the 'bind' method on Functions to do partial evaluation
// of functions, as shown.
//
// Here, loopN now accepts only one argument rather than two. (We'll cover
// the null argument passed in to bind when we discuss 'this').
loop(10, sq); // [ 0, 1, 4, 9, 16, 25, 36, 49, 64, 81 ]
var loopN = loop.bind(null, 10); // n = 10
console.log(loopN(sq)); // [ 0, 1, 4, 9, 16, 25, 36, 49, 64, 81 ]

// 2. Implementing currying in underscore is easy with the 'partial' method.
var uu = require('underscore');
loop6 = uu.partial(loop, 6);
console.log(loop6(sq));  // [ 0, 1, 4, 9, 16, 25 ] 