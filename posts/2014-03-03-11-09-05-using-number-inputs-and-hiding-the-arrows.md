---

After finding Angular's `ng-pattern` to be cumbersome, I decided to checkout the [number input type](http://dev.w3.org/html5/markup/input.number.html). The client-side validation was just what I wanted, but the pesky up/down buttons made it look ugly and took up precious space on my already cramped user interface.

Having used the power of Google, I found a way to disable these ugly buttons.

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;        
    }

The next issue I had was that it wanted to accept integers only. Not good for currency operations. 

Luckily, there are a few attributes available to us. One of these is `step`, which "specifies the value granularity of the element’s value". Setting `step` to `any` allows you to go to any granularity you like. 

Another two useful attributes are `min` and `max`, which allow you to set a defined range.

    <input type="number" step="any" min="0" max="100">

This is a truly useful element and hopefully we'll see much more built-in functionality come to HTML5.
