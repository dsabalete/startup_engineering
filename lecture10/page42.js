#!/bin/env node
var log = console.log;

// Inheritance isn't always the answer
//
// Instead of subclassing Honda, Mercedes, etc., we can often get away with
// switch statements or the like. rather than going with a class as a 
// extremely heavyweight if/then statement.
//
// NOTE: in this particular example, we can actually replace the switch
// statement with an object lookup, but in general one might have more
// sophisticated logic in each switch case.

function Car(make, model) {
    this.make = make;
    this.model = model;
}
Car.prototype.toString = function() {
    return "Make: " + this.make + " | Model: " + this.model;
};
Car.prototype.serviceInternals = function() {
    switch(this.make) {
        case 'Honda':
            out = [10000, 20000, 30000]
            break;
        case ' Mercedes':
            out = [20000, 40000, 60000];
            break;
        default:
            out = [5000, 10000, 20000];
            break;
    }
    return out;
};

// Now let's instantiate some variables.
var accord = new Car('Honda', 'Accord');
var merc = new Car('Mercedes', 'S-Class');
var misc = new Car('Chrysler', 'Eminem Ride');

log(accord.toString());
log(merc.toString());
log(misc.toString());
log(accord.serviceInternals());
log(merc.serviceInternals());
log(misc.serviceInternals());