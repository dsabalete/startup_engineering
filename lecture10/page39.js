#!/bin/env node

var dbobj = {
    protocol: 'postgres',
    user: 'myuser',
    pass: 'mypass',
    host: 'example.com',
    port: '5432',
    dbpass: 'mydbpass',
    toString: function() {
        return this.protocol + '://' +
            this.user + ':' + 
            this.pass + '@' + 
            this.host + ':' + 
            this.port + '/' + 
            this.dbpass;
    }
};

console.log(dbobj.toString());

// 'postgres://myuser:mypass@example.com:5432/mydbpass'
