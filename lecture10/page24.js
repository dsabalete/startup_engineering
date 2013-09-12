#!/bin/env node
// http://projecteuler.net/prblem=1
// If we list all the natural numbers velow 10 that are multiples of 3 or 5,
// we get 3, 5, 6 and 9. The sum of these multiples is 23.
//
// Find the sum of all the multiples of 3 or 5 below 1000.
//
// We'll make heavy use of underscore here to illustrate some FP techniques.
var uu = require("underscore");

// For the anydivide function
//  - uu.map takes an array and a univariate function, and applies the
//    function element-wise to the array, returning a new array.
//
//  - We define divfn via a closure, so that it takes one variable and
//    returns one output. This can then be passed to uu.map.
//
//  - uu.any takes an array of booleans and returns true if and only if one
//    of them is true, and false otherwise.
var anydivide = function(as, b) {
    var divfn = function(a) { return b % a === 0; };
    return uu.any(uu.map(as, divfn));
};

// For the sum function
//
//  - uu.reduce takes an array and a function, and applies that function
//    interatively to each element of the array, starting from the first element.
//  - The anonymous function we pass in as the second argument just adds adjacent 
//    elements together.
//
var sum = function(arr) {
    return uu.reduce(arr, function(a, b) { return a + b;});  
};

// For the fizzbuzz function
//
//  - We define difgn as a a closure, using the factors variable. Again, this
//    is so that it takes one argument, returns one output, and can be passed to map.
//
//  - We use uu.filter to iterate over an array and return all elements
//    which pass a condition, specified bya function that returns booleans.
//    The array is the first argument to uu.filter and the boolean-valued
//    func is the second argument.
//
//  - We use uu.range to generate an array of numbers between two specified
//    values.
//
var fizzbuzz = function(factors, max) {
    var divfn = function(nn) { return anydivide(factors, nn) };
    var divisible = uu.filter(uu.range(1, max), divfn);
    return sum(divisible);
};

// console.log(fizzbuzz([3,5], 10));
console.log(fizzbuzz([3,5], 1000));
