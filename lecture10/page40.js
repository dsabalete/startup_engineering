#!/bin/env node

// Exemple of inheritance
//
// Item - sku, price
// Book - title, text, search
// Furniture - name, width, length


// 0. Preliminaries: this helper function copies the properties and methods
// of the parentObject to the childObject using the copyOfParent intermediary.
// 
// See Zakas' writeup at goo.gl/o1wRG0 for details.
function inheritPrototype(childObject, parentObject) {
    var copyOfParent = Object.create(parentObject.prototype);
    copyOfParent.constructor = childObject;
    childObject.prototype = copyOfParent;
}

// 1. Define the parent class constructor and add prototype methods
function Item(sku, price) {
    this.sku = sku;
    this.price = price;
}
Item.prototype.toString = function() {
    return "SKU: " + this.sku + " | Price: " + this.price + " USD";
};

// 2. Define the subclass constructor, copy over properties and methods of
// Item, and then define a new function.
function Book(sku, price, title, text) {
    Item.call(this, sku, price);
    this.title = title;
    this.text = text;
};

inheritPrototype(Book, Item);

Book.prototype.search = function(regexstr) {
    var regex = RegExp(regexstr);
    var match = regex.exec(this.text);
    var out = '';
    if (match !== null) {
        var start = match.index;
        var end = match.index + match[0].length;
        var dx = 3;
        var padstart = start - dx > 0 ? start - dx : start;
        var padend = end + dx > 0 ? end + dx : end;
        out = '...' + this.text.slice(padstart, padend) + '...';    
    }
    return out;
};

// 3. Do one more subclass for illustrative purposes
function Furniture(sku, price, name, width, length) {
    Item.call(this, sku, price);
    this.name = name;
    this.width = width;
    this.length = length;
};

inheritPrototype(Furniture, Item);

Furniture.prototype.floorArea = function() {
    return this.width * this.length;  
};



// 4. Now let's test things out.
// Remember to use new!
var foo = new Item("ID:8908308", 43.27);
foo.sku;            // 'ID:8908308'
foo.price;          // 43.27
foo.toString();     // 'SKU: ID:8908308 | Price: 43.27 USD'

var bible = new Book("ID:123456", 101.02, "The Bible", "In the beginning there was");
bible.sku;
bible.price;
bible.toString();
bible.search('there');
bible.search('therex');

var chair = new Furniture("ID:79808", 2020.32, "A chair", .5, 4.2);
chair.sku;
chair.price;
chair.toString();
chair.floorArea();
