---
title: Intercepting XMLHttpRequest requests
slug: intercepting-xmlhttprequest-requests
date: 2015-03-11 12:20
tags:
 - javascript
---

Let's kick off the continuation of my code blogging with a very helpful little snippet. I'm just removing this from a code-base so it can sit here for eternity instead.


    (function(open) {
        XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
            // do some magic
            open.call(this, method, url, async, user, pass);
        };
    })(XMLHttpRequest.prototype.open);
    
This will intercept the request before it happens, and once you've done whatever changes you need to do, be it logging or tagging, you can continue it.
