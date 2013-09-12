#!/bin/env node

var request = require('request');
var apiurl = 'http://nodejs.org/api/index.json';
var fs = require('fs');
var outfile = 'index3.json';
setTimeout(function() {
    request(apiurl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFile(outfile, body, function (err) {
                if (err) throw err;
                var timestamp = new Date();
                console.log("Invoked firs, happens second at %s", new Date());
                console.log("Wrote %s %s", outfile, timestamp);
            });
        }
    });
}, 3000);
console.log("Invoked second, happens first at %s", new Date());