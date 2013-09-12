#!/bin/env node



// Implementation 1: Procedural
var log = console.log;
var n = 5;
var out = [];
for (var i = 0; i < n; i++) {
    out.push(i * i);
}
log(out);

log('-------------------');

// Implementation 2: Functional Programming
// Functions as first class variables
//
// Allows us to abstract out the loop and the function applied within, such
// that we can swap in a new function or a new kind of interation.
var sq = function(x) { return x * x;};
var cub = function(x) {return x * x * x;};
var loop = function(n, fn) {
    var out = [];
    for (var i = 0; i < n; i++) {
        out.push(fn(i));
    }
    return out;
};
var loopeven = function(n, fn) {
    var out = [];
    for (var i = 0; i < n; i++) {
        if (i % 2 === 0) {
            out.push(fn(i));
        } else {
            out.push(i);
        }
    }
    return out;
};

log(loop(n, sq));
log(loop(n, cub));
log(loopeven(n, sq));
log(loopeven(n, cub));

log('-------------------');

// Implementation 3: Functional Programming with underscorejs.org
// Note the use of the map and range methods.
//  - range: generate and array of numbers between 0 and n
//  - map: applay a function to a specified array
var uu = require('underscore');
log(uu.map(uu.range(0, n), sq));
log(uu.map(uu.range(0, n), cub));


