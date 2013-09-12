#!/bin/env node

var fs = require('fs');
var request = require('request');
var uu = require('underscore');
var apiurl = 'http://nodejs.org/api/index.json';
var outfile = 'index-parsed.json';

var module2obj = function(mod) {
    var modregex = /\[([^\]]+)\]\(([^\)]+)\)/;
    var match = modregex.exec(mod);
    return {'name': match[1], 'file': match[2]};
};

var data2name_files = function(data) {
    var notUndefined = function(xx) { return !uu.isUndefined(xx);};
    var modules = uu.filter(uu.pluck(data.desc, 'text'), notUndefined);
    return uu.map(modules, module2obj);
};

var body2json = function(body) {
    return JSON.stringify(data2name_files(JSON.parse(body)), null, 2);
};

var make_request = function(apiurl, OUTFILE) {
    
    var cb_writefile = function(err) {
        if (err) throw err;
        var timestamp = new Date();
        console.log("Wrote %s %s", OUTFILE, timestamp);
    };
    
    var cb_parsebody = function(error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFile(OUTFILE, body2json(body), cb_writefile);
        }
    };
    
    request(apiurl, cb_parsebody);
};

make_request(apiurl, outfile);

/* This code returns the raw output:


 */ 