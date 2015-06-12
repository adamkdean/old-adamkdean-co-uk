var blog = require('./blog'),
    httpd = require('./httpd'),
    heroku = require('./heroku'),
    routes = require('./routes');

// initialise various things
blog.init();
heroku.init();
httpd.init();
httpd.start();
routes.init();
