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
    var tags = blog.getTags();
    var posts = blog.getPosts();

    yield this.render('index', {
        posts: posts,
        tags: tags
    });
});

// httpd.get('/tag/:tag', function *() {
//     var tags = blog.getTags(),
//         posts = {
//             all: blog.getPosts(),
//             tagged: blog.getPosts({ tag: this.params.tag || '' })
//         };
//
//     if (posts.all) {
//         yield this.render('posts', {
//             posts: posts,
//             tags: tags
//         });
//     } else {
//         yield this.render('404', {
//             type: 'tag',
//             resource: this.params.tag || ''
//         });
//     }
// });
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
