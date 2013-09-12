#!/bin/env node
// Scope in JS

var log = console.log;

// 1. Unintentional global variables
//
//    This can occur if you forget to declare cc within foo.
var cc = 99;
var foo = function(aa) {
    var bb = 7;
    log("aa = " + aa);
    log("bb = " + bb);
    log("cc = " + cc);
};
foo(22);
/*
aa = 22                                                                                                                                                                              
bb = 7                                                                                                                                                                               
cc = 99  
*/

log("-----------------");

// 2. Intentional flobal variables
//
//    This is the recommended syntax within node if you really
//    want to use globals. You can accompish the same thing with
//    window in the browser.
var dd = 33;
var bar = function(aa) {
    var bb = 7;
    log("aa = " + aa);
    log("bb = " + bb);
    log("dd = " + global.dd);
};
bar(22);
/*
aa = 22                                                                                                                                                                              
bb = 7                                                                                                                                                                               
dd = undefined  
*/

log("-----------------");

// 3. Scope in statically defined functions
//
//    The aa defined within this functions' argument and the bb within its
//    body override the external aa and bb. This function is defined
//    'statically', i.e. it is not generated on the fly from input arguments
//    while the program is running.
var aa = 7;
var bb = 8;
var baz = function(aa) {
    var bb = 9;
    log("aa = " + aa);
    log("bb = " + bb);
};
baz(16);
/*
aa = 16                                                                                                                                                                              
bb = 9  
*/

log("-----------------");

// 4. Scope in dynamically defined functions (simple)
//
//    Often we'll want to build a function on the fly, in which case the use
//    of variables from the enclosing scope is a feature rather than a
//    bug. This kind of function is called a closure. Let's first do a
//    trivial example.
//
//    Here, buildfn is intentionally using hte increment variable
//    passed in as an argument in the body of the newfn, which is
//    being created on the fly.
var buildfn = function(increment) {
    var newfn = function adder(xx) { return xx + increment; };
    return newfn;
};
log(buildfn(10)); // [Function: adder]
log(buildfn(10)(17)); // 27
var add3 = buildfn(3);
var add5 = buildfn(5);
log(add3(add5(17))); // 25

log("-----------------");

//    Here's a more complex exmple where we pass in a function rather
//    than simply assuming buildfn2 will be doing addition.
var buildfn2 = function(yy, binaryoperator) {
    var cc = 10;
    var newfn = function binop(xx) { return cc*binaryoperator(xx, yy); };
    return newfn;
};
var pow = function(aa, bb) { return Math.pow(aa, bb);}
var fn = buildfn2(3, pow);
log(fn(5)); // 10 * Math.pow(5,3);

log("-----------------");

// 5. Scope in dynamically defined functions (more advanced)
//
//    Here's a more realistic example, where we define a meta-function that
//    takes two other functions and snaps them together to achieve an effect.
var compose = function(f, g) {
    var h = function(x) {
        return f(g(x));
    };
    return h;
};
var jsdata = '[{"asdf":9, "bar":10}, 18, "baz"]';
var f1 = function(data) { return data[0].bar + 11;};
var f2 = JSON.parse;
log(f1(f2(jsdata))); // 10 + 11 === 21
var f1f2 = compose(f1, f2);
log(f1f2(jsdata)); // 10 + 11 === 21

log("-----------------");

// 6. Dynamically defined scope in functions (this)
//
//    Now, what if we want to go one level more abstract? This time
//    we want to define a closure that doesn't take on its values
//    from the current context, but from some context that we will
//    dynamically specigy at a later date.
var bb = 10;
var static_closure = function(aa) {
    return aa + bb;
};
log(static_closure(3)); // 13

var dynamic_closure = function(aa) {
    return aa + this.bb;
};

var context1 = {
    'fn': dynamic_closure,
    'bb': 10
};

log(context1.fn(3)); // 13

var context2 = {
    'fn': dynamic_closure,
    'bb': Math.random()
};

log(context2.fn(3)); // a random value


//
// Great. So, to recap, the 'this' variable points to a single object or
// else is undefined. You can use it to leave the enclosing scope for a 
// closure unspecified until the last moment when it's executed.
//
// If you can, you may want to simply pass in the object itself as an 
// explicit variable, as shown below. Otherwise one can use 'this'.
var simpler_than_dynamic_closure = function(aa, obj) {
    return aa + obj.bb;
};

log(simpler_than_dynamic_closure(3, context2)); // a random value like in context2.fn(3)