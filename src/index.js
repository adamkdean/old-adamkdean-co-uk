var config = require('./config'),
    blog = require('./blog');

blog.updateAsync(function() {
    // on index, get a list of blog posts
    blog.getPosts();

    // on specific permalink, get that particular post
    blog.getPosts({
        permalink: 'permalink'
    });

    // on tag, get all tagged posts
    blog.getPosts({
        tag: 'tag'
    });
});
