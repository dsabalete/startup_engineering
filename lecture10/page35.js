#!/bin/env node

var request = require('request');
var apiurl = 'http://nodejs.org/api/index.json';
var fs = require('fs');
var outfile = 'index4.json';

var cb_writefile = function(err) {
    if (err) throw err;
    var timestamp = new Date();
    console.log("Invoke first, happens second at %s", new Date());
    console.log("Wrote %s %s", outfile, timestamp);
};

var cb_parsebody = function(error, response, body) {
    if (!error && response.statusCode == 200) {
        fs.writeFile(outfile, body, cb_writefile);
    }  
};

request(apiurl, cb_parsebody);
console.log("Invoked second, happens first at %s", new Date());