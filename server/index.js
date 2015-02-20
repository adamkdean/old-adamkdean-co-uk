var blog = require('./blog'),
    httpd = require('./httpd'),
    config = require('./config');

// initialise various things
blog.startUpdateCycle();
httpd.init();
httpd.start();

// configure our routes
httpd.get('/', function *() {
    var tags = blog.getTags({ sort: 'desc' }),
        posts = blog.getPosts();

    var postsPerPage = (posts.length > config.SITE_POSTS_PER_PAGE)
        ? config.SITE_POSTS_PER_PAGE
        : posts.length;

    yield this.render('index', {
        tags: tags,
        posts: posts,
        postsPerPage: postsPerPage
    });
});

httpd.get('/tag/:tag', function *() {
    var tags = blog.getTags({ sort: 'desc' }),
        posts = blog.getPosts(),
        taggedPosts = blog.getPosts({ tag: this.params.tag || '' });

    var postsPerPage = (taggedPosts.length > config.SITE_POSTS_PER_PAGE)
        ? config.SITE_POSTS_PER_PAGE
        : taggedPosts.length;

    if (taggedPosts) {
        yield this.render('tag', {
            tags: tags,
            posts: posts,
            taggedPosts: taggedPosts,
            postsPerPage: postsPerPage
        });
    } else {
        yield this.render('404', {
            type: 'tag',
            resource: this.params.tag || ''
        });
    }
});

httpd.get('/:slug', function *() {
    var tags = blog.getTags({ sort: 'desc' }),
        posts = blog.getPosts(),
        post = blog.getPosts({ slug: this.params.slug || '' });

    if (post) {
        yield this.render('slug', {
            tags: tags,
            posts: posts,
            post: post
        });
    } else {
        yield this.render('404', {
            type: 'slug',
            resource: this.params.slug || ''
        });
    }
});
