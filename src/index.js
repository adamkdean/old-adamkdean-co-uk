var config = require('./config'),
    blog = require('./blog');

blog.updateAsync(function() {
    // blog.getPosts();
    // blog.getPosts({
    //     slug: 'test-post-one'
    // });

    var posts = blog.getPosts({
        slug: 'test-post-one'
    });

    console.log(posts);
});
