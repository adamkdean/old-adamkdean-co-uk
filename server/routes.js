var _ = require('lodash'),
    blog = require('./blog'),
    httpd = require('./httpd'),
    heroku = require('./heroku'),
    config = require('./config');

var self = {

    init: function() {
        httpd.get(['/', '/page/:page'], this.indexCtl);
        httpd.get('/tag/:tag', this.tagsCtl);
        httpd.get('/tag/:tag/page/:page', this.tagsCtl);
        httpd.get('/search', this.searchCtl);
        httpd.get('/blog/read/:id/:slug', this.slugRedirectCtl);
        httpd.get('/:slug', this.slugCtl);
    },

    output: function *(context, template, locals) {
        var defaultLocals = {
            tags: blog.getTags({ sort: 'desc' }),
            allPosts: blog.getPosts(),
            posts: blog.getPosts(),
            postsPerPage: config.SITE_POSTS_PER_PAGE,
            pageNumber: context.params.page || 1,
            maxPages: 1,
            pageOffset: 0,
            title: null,
            params: context.params,
            query: context.query
        };

        locals = _.assign(defaultLocals, locals);

        if (locals.posts == null) {
            locals.posts = [];
        }

        // make sure we don't show too many
        if (locals.posts.length < locals.postsPerPage) {
            locals.postsPerPage = locals.posts.length;
        }

        // make sure we are within our limits
        locals.maxPages = Math.ceil(locals.posts.length / locals.postsPerPage);
        if (locals.pageNumber < 1) locals.pageNumber = 1;
        else if (locals.pageNumber > locals.maxPages) locals.pageNumber = locals.maxPages;

        // make sure we don't show too many on the last page
        locals.pageOffset = (locals.postsPerPage * (locals.pageNumber - 1));
        if (locals.pageOffset + locals.postsPerPage > locals.posts.length) {
            locals.postsPerPage = locals.posts.length - locals.pageOffset;
        }

        yield context.render(template, locals);
    },

    indexCtl: function *() {
        yield self.output(this, 'posts', {});
    },

    tagsCtl: function *() {
        yield self.output(this, 'posts', {
            posts: blog.getPosts({ tag: this.params.tag || '' }),
            title: this.params.tag || null
        });
    },

    searchCtl: function *() {
        var results = yield blog.getPosts({ search: this.query.searchTerm || '' }),
            posts = [];

        for(var i = 0; i < results.hits.length; i++) {
            posts.push(results.hits[i].document);
            posts[i].metadata = posts[i].metadata[0]; // fix searchIndex 'bug'?
        }

        yield self.output(this, 'posts', {
            posts: posts,
            title: this.query.searchTerm || null
        });
    },

    slugRedirectCtl: function *() {
        var post = blog.getPosts({ slug: this.params.slug || '' });

        if (post) {
            this.status = 301;
            this.redirect('/' + this.params.slug);
        } else {
            yield this.render('404', {
                type: 'slug',
                resource: this.params.slug || '',
                version: heroku.getReleaseString()
            });
        }
    },

    slugCtl: function *() {
        var tags = blog.getTags({ sort: 'desc' }),
            allPosts = blog.getPosts(),
            post = blog.getPosts({ slug: this.params.slug || '' });

        if (post) {
            yield this.render('slug', {
                tags: tags,
                allPosts: allPosts,
                post: post,
                title: post.metadata.title,
                version: heroku.getReleaseString()
            });
        } else {
            yield this.render('404', {
                type: 'slug',
                resource: this.params.slug || '',
                version: heroku.getReleaseString()
            });
        }
    }

};

module.exports = exports = self;
