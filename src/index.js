var config = require('./config'),
    blog = require('./blog');

blog.updateAsync(function() {
    // on index, get a list of blog posts
    blog.getPosts();

    // on specific slug, get that particular post
    blog.getPosts({
        slug: 'test-post-one'
    });

    // on tag, get all tagged posts
    blog.getPosts({
        tag: 'banana'
    });
});
