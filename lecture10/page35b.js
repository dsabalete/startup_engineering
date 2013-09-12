#!/bin/env node

var request = require('request');
var apiurl = 'http://nodejs.org/api/index.json';
var fs = require('fs');
var outfile = 'index-scoped.json';

var make_request = function(apiurl, OUTFILE) {
    
    var cb_writefile = function(err) {
        if (err) throw err;
        var timestamp = new Date();
        console.log("Wrote %s %s", OUTFILE, timestamp);
    };
    
    var cb_parsebody = function(error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFile(OUTFILE, body, cb_writefile);
        }
    };
    
    request(apiurl, cb_parsebody);
};

make_request(apiurl, outfile);

// Because we appropiately scoped outfile, 
// we have a much more general and easy to use function.
// We can now easily pass in another output file.
var another_outfile = 'index-another.json';
make_request(apiurl, another_outfile);