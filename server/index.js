var blog = require('./blog'),
    httpd = require('./httpd'),
    config = require('./config');

// initialise various things
blog.startUpdateCycle();
httpd.init();
httpd.start();

console.log('**** start ****');

// configure our routes
httpd.get('/', function *() {
    var tags = blog.getTags(),
        posts = blog.getPosts();

    yield this.render('index', {
        tags: tags,
        posts: posts
    });
});

httpd.get('/tag/:tag', function *() {
    var tags = blog.getTags(),
        posts = blog.getPosts(),
        taggedPosts = blog.getPosts({ tag: this.params.tag || '' });

    if (taggedPosts) {
        yield this.render('tag', {
            tags: tags,
            posts: posts,
            taggedPosts: taggedPosts
        });
    } else {
        yield this.render('404', {
            type: 'tag',
            resource: this.params.tag || ''
        });
    }
});

httpd.get('/:slug', function *() {
    var tags = blog.getTags(),
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

//
// httpd.get('/:slug', function *() {
//     var tags = blog.getTags(),
//         post = blog.getPosts({ slug: this.params.slug || '' }),
//         posts = {
//             all: blog.getPosts()
//         };
//
//     if (post) {
//         yield this.render('post', {
//             post: post,
//             posts: posts,
//             tags: tags
//         });
//     } else {
//         yield this.render('404', {
//             type: 'post',
//             resource: this.params.slug || ''
//         });
//     }
// });
