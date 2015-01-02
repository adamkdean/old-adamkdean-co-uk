var blog = require('./blog'),
    httpd = require('./httpd'),
    config = require('./config');

// initialise various things
blog.startUpdateCycle();
httpd.init();
httpd.start();

// configure our routes
httpd.get('/', function *() {
    var tags = blog.getTags(),
        posts = blog.getPosts();

    yield this.render('index', {
        tags: tags,
        posts: posts
    });
});

httpd.get('/tags', function *() {
    var tags = blog.getTags();

    yield this.render('tags', {
        tags: tags
    });
});

httpd.get('/tag/:tag', function *() {
    var posts = blog.getPosts({ tag: this.params.tag || '' });

    if (posts) {
        yield this.render('tag', {
            posts: posts
        });
    } else {
        yield this.render('404', {
            type: 'tag',
            resource: this.params.tag || ''
        });
    }
});

httpd.get('/:slug', function *() {
    var post = blog.getPosts({ slug: this.params.slug || '' });

    if (post) {
        yield this.render('post', {
            post: post
        });
    } else {
        yield this.render('404', {
            type: 'post',
            resource: this.params.slug || ''
        });
    }
});
