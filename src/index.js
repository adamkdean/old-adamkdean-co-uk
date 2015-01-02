var blog = require('./blog'),
    httpd = require('./httpd'),
    config = require('./config');

// get the blog started
blog.startUpdateCycle();

httpd.init();
httpd.start();
