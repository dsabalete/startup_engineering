#!/bin/env node

// Inheritance isn't always the answer, pt. 2
//
// Let's do another example where we show two different kinds of objects
// relate via composition.
function Wheel(isfront, isright) {
    this.isfront = isfront;
    this.isright = isright;
}
Wheel.prototype.toString = function () {
    var pos1 = this.isfront ? 'f' : 'b'; // front/back
    var pos2 = this.isright ? 'r' : 'l'; // right/left
    return pos1 + pos2;
};
var wheel1 = new Wheel(true, true);
var wheel2 = new Wheel(true, false);
var wheel3 = new Wheel(false, true);
var wheel4 = new Wheel(false, false);

wheel1.toString(); // 'fr'
wheel2.toString(); // 'fl'
wheel3.toString(); // 'br'
wheel4.toString(); // 'bl'

// We use the invoke method in underscore.
// See underscorejs.org/#invoke
var uu = require('underscore');
function Car(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
}
Car.prototype.toString = function() {
    var jsdata = {'make': this.make, 
                    'model': this.model,
                    'wheels': uu.invoke(this.wheels, 'toString')};    
    var spacing = 2;
    return JSON.stringify(jsdata, null, spacing);
};

var civic = new Car('Honda', 'Civic', [wheel1, wheel2, wheel3, wheel4]);

console.log(civic);
/*
{ make: 'Honda',                                                                                                                                                                     
  model: 'Civic',                                                                                                                                                                    
  wheels:                                                                                                                                                                            
   [ { isfront: true, isright: true },                                                                                                                                               
     { isfront: true, isright: false },                                                                                                                                              
     { isfront: false, isright: true },                                                                                                                                              
     { isfront: false, isright: false } ] } 
*/

console.log(civic.toString());
/*
{                                                                                                                                                                                    
  "make": "Honda",                                                                                                                                                                   
  "model": "Civic",                                                                                                                                                                  
  "wheels": [                                                                                                                                                                        
    "fr",                                                                                                                                                                            
    "fl",                                                                                                                                                                            
    "br",                                                                                                                                                                            
    "bl"                                                                                                                                                                             
  ]                                                                                                                                                                                  
} 
*/

