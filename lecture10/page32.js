#!/bin/env node

var request = require("request"); // npm install request
var apiurl = "http://nodejs.org/api/index.json";
var callbackfn = function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
};
request(apiurl, callbackfn);

// When executed, this produces the following
/*
   "source": "doc/api/index.markdown",
   "desc": [
    {
        "type": "list_start", 
        "ordered": false
    },
    {
        "type": "list_item_start"
    },
    {
        "type": "text",
        "text": "[About these Docs](documentation.html)"
    },
    {
        "type": "list_item_end"
    },
    {
        "type": "list_item_start"
    },
    {
        "type": "text"
        "text": "[Synopsis](synopsis.html)"
    },
    {
        "type": "list_item_end"
    },
    {
        "type": "list_item_start"
    },
...    
   
*/

