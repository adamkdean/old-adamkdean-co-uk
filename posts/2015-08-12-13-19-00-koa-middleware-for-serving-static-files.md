---
title: Koa middleware for serving static files
slug: koa-middleware-for-serving-static-files
date: 2015-08-12 13:19
tags:
 - npm
 - node.js
 - koa
---

Quite often I find myself using the same snippet of code over and over in projects for serving up static files as part of projects that use Koa. Today I exceeded my limit for copy pasting, so I've bundled this together into a module called `koa-serve`.

It's probably a lot simpler than `koa-static` but it works well for what I want and need.

    var koa = require('koa'),
        serve = require('koa-serve'),
        app = koa();

    app.use(serve('assets'));
    app.listen(8000);

You can also define where you root dir is, if isn't `__dirname`.

    var koa = require('koa'),
        serve = require('koa-serve'),
        app = koa();

    app.use(serve('assets', '/path/to/your/root'));
    app.listen(8000);

Example if your client files are in the parent directory, and index.js is in server/ for example:

    var koa = require('koa'),
        serve = require('koa-serve'),
        path = require('path'),
        app = koa();

    app.use(serve('assets', path.join(__dirname, '..', 'client'));
    app.listen(8000);

## Get it

Install it with npm like so:

    npm i koa-serve
    
## More links

https://github.com/adamkdean/koa-serve
https://www.npmjs.com/package/koa-serve
