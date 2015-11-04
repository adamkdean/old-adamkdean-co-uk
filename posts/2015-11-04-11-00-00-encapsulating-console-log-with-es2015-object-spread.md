---
title: Encapsulating console.log with spread operator
slug: encapsulating-console-log-with-spread-operator
date: 2015-11-04 11:00
tags:
 - javascript
 - es2015
 - es6
---
    
[ES6 or ES2015](http://www.ecma-international.org/ecma-262/6.0/) contains lots of goodies. One of them, my favourite, is the spread operator. It "allows an expression to be expanded in places where multiple arguments (for function calls) or multiple elements (for array literals) are expected."

For example, you can combine two arrays like so:

    var start = ['a', 'b', 'c'],
        end = ['d', 'e', 'f'];
        
    var combined = [...start, ...end];
    
    console.log(combined);
    
    // => ['a', 'b', 'c', 'd', 'e', 'f']
    
What I like even more, is that you can do this with function arguments. Let's say we wanted to wrap `console.log` so we can do something funky with it. This can easily be done using the spread operator.
    
    var log = function (format, ...args) {
        if (args.length > 0) console.log(format, args);
        else console.log(format);
    }
    
    log('test');
    log('this is an %s test', 'interpolation');

    // => test
    // => this is an interpolation test
    
This changes things. [Read more at MDN](n-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).

ES7 should also bring object spread operators, so you can do `{ ...initial, ...change }`.
