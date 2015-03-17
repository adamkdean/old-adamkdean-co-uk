var blog = require('./blog'),
    httpd = require('./httpd'),
    heroku = require('./heroku'),
    routes = require('./routes');

// initialise various things
blog.startUpdateCycle();
heroku.init();
httpd.init();
httpd.start();
routes.init();
