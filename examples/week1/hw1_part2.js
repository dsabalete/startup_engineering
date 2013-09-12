#!/usr/bin/env node
var fs = require('fs');
var outfile = "hw1_part2.txt";

// It returns true when a number is a prime number
var isPrime = function(num) {
    if (num === 2) {
        return true;
    }
    if (num % 2 === 0) {
        return false;
    }
    for(var i = 3; i * i <= num; i += 2) {
        if(num % i === 0)
            return false;
    }
    return true;
}

// It returns an array with the "max" first prime numbers
var getPrimes = function(max) {
    var next = true, i = 2, primes = [];
    while(next) {
        if (isPrime(i)) {
            primes.push(i);
        }
        i++;
        next = primes.length < max;        
    }
    return primes;
}

// The 100 first prime numbers
var out = getPrimes(100);

// Writing to a file
fs.writeFileSync(outfile, out);  

// Show me what is going on
console.log("Script: " + __filename + "\nWrote: " + out + "To: " + outfile);

