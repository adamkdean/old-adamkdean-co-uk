var blog = require('./blog'),
    httpd = require('./httpd'),
    routes = require('./routes');

// initialise various things
blog.init();
httpd.init();
httpd.start();
routes.init();
