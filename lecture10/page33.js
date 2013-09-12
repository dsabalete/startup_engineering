#!/bin/env node

var request = require('request');
var apiurl = 'http://nodejs.org/api/index.json';
var fs = require('fs');
var outfile = 'index2.json';
request(apiurl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        fs.writeFile(outfile, body, function (err) {
            if (err) throw err;
            var timestamp = new Date();
            console.log("Wrote %s %s", outfile, timestamp);
        });
    }
});