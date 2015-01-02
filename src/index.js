var blog = require('./blog'),
    httpd = require('./httpd'),
    config = require('./config');

// initialise various things
blog.startUpdateCycle();
httpd.init();
httpd.start();

// configure routes

httpd.get('/', function *() {
    this.body = 'index';
});

httpd.get('/:slug', function *() {
    var slug = this.params.slug || '',
        post = blog.getPosts({ slug: slug });

    if (post) {
        this.body = '200 ' + this.params.slug + ' found';
    } else {
        this.body = '404 ' + this.params.slug + ' not found';
    }

});
