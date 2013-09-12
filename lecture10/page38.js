#!/bin/env node

var parsedburl = function(dburl) {
    var dbregex = /([^:]+):\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
    var out = dbregex.exec(dburl);
    return {'protocol': out[1],
        'user': out[2],
        'pass': out[3],
        'host': out[4],
        'port': out[5],
        'dbpass': out[6]};
};
var pgurl = "postgres://myuser:mypass@example.com:5432/mydbpass";
console.log(parsedburl(pgurl));
/*
{ protocol: 'postgres',                                                                                                                                                              
  user: 'myuser',                                                                                                                                                                    
  pass: 'mypass',                                                                                                                                                                    
  host: 'example.com',                                                                                                                                                               
  port: '5432',                                                                                                                                                                      
  dbpass: 'mydbpass' } 
*/