---
title: Invalidate require cache
slug: invalidate-require-cache
date: 2016-07-01 15:45
tags: 
 - node.js
 - commonjs
---

[CommonJS](http://requirejs.org/docs/commonjs.html), the module format that Node.js uses, caches modules the first time that you require them. In a sense, all required Node.js modules are singletons. Sometimes, this isn't so good. For example, an application library might reload a configuration file everytime it starts up. If you need to run tests, and perhaps change the configuration file each time, then you're going to need to be able to have a fresh `require()` for each test.

To do this, you need to delete the module from `require.cache`:

    delete require.cache[require.resolve('./path/to/file')]
    
The following example will show this working:

`date.js`:

    var date = new Date()
    
    module.exports = exports = function (msg) {
      msg = msg || 'n/a'
      return `Generated on ${date.toString()} with: ${msg}`
    }

`index.js`:

    var date = require('./date')
    
    console.log(date('first'))
    
    setTimeout(function () {
    
      delete require.cache[require.resolve('./date.js')]
    
      date = require('./date')
      console.log(date('2 seconds later'))
    
    }, 2000)
    
Output:

  adam@macbook:test $ node index.js
  Generated on Fri Jul 01 2016 15:49:11 GMT+0100 (BST) with: first
  Generated on Fri Jul 01 2016 15:49:13 GMT+0100 (BST) with: 2 seconds later
