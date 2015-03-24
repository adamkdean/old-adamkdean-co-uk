---
title: ES6 compatible sleep function
slug: es6-compatible-sleep-function
date: 2015-03-24 16:33
tags:
 - javascript
 - es6
---

While debugging locally, it can be hard to see how an application runs in the wild as the network has no delay. Quite often, you get around this using a sleep function.

Pre-ES6 generators, you might do this with a callback, maybe using a setTimeout that calls the callback.

    function sleep(ms, callback) {
        setTimeout(callback, ms);
    }

With ES6 generators, where you want to `yield sleep(1000)` etc, you can't use callbacks. What you can do is return a function that takes a single parameter, `done`, which through closure has access to the parameter you want to pass in, `ms`. When the returned function is called by whatever cog under the hood calls the returned functions when yielding, your inner function will have access to the `ms` parameter you passed in, along with a callback that JS passes in, which when called, will continue on from where you yielded the sleep.

    function sleep(ms) {
        return function(done) {
            setTimeout(done, ms);
        }
    }

    yield sleep(1000);
    
Hopefully that makes sense. It does in my head.
