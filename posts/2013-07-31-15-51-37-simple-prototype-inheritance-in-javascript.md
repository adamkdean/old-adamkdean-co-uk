---

The snippet below is simple JavaScript prototype inheritance. Being a .NET person, it seems a bit strange at first, but really it's just a chain of base classes known as prototypes that link right back to the object. I wanted to get an idea of how regular ol' js works without using any of the supposedly great libraries out there such as [base.js](https://code.google.com/p/base2/) and [John Resig's Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/).

    var Base = function() {  
      this.printString = function(string) {
        console.log(string);
      }
    };

    var Ext = function() {
      this.printMessage = function() {
        this.printString("Hello, testing!");
      }
    };

    Ext.prototype = new Base();

    var ext = new Ext();
    ext.printString("test!"); // calls prototype method from Base
    ext.printMessage();       // calls method from Ext

Quite self-explanatory, hopefully I will get some time to delve more into this. Expect posts if I do!