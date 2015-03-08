var blog = require('./blog'),
    httpd = require('./httpd'),
    config = require('./config'),
    suspend = require('suspend'),
    resume = suspend.resume;

var self = {

    init: function() {
        httpd.get(['/', '/page/:page'], this.indexCtl);
        httpd.get('/tag/:tag', this.tagsCtl);
        httpd.get('/tag/:tag/page/:page', this.tagsCtl);
        httpd.get('/search', this.searchCtl);
        httpd.get('/blog/read/:id/:slug', this.slugRedirectCtl);
        httpd.get('/:slug', this.slugCtl);
    },

    indexCtl: function *() {
        var locals = self.getLocals(this.params, false);
        yield this.render('posts', locals);
    },

    tagsCtl: function *() {
        var locals = self.getLocals(this.params, true);
        yield this.render('posts', locals);
    },

    searchCtl: function *() {

        suspend(function*() {
            var posts = yield blog.getPosts({ search: this.query.searchTerm || '' }, resume());

            console.log('******** posts:', posts);

            yield this.render('404', {
                type: 'search',
                resource: this.query.searchTerm || ''
            });

        })();

        // var _this = this;
        // (function() {
        //     console.log(_this);
        //     blog.getPosts({ search: _this.query.searchTerm || '' }, function(err, results) {
        //         console.log('*********************************');
        //         console.log('results', results);
        //         console.log('*********************************');
        //
        //         //var locals = self.getLocals(_this.params, false);
        //         //yield _this.render('posts', locals);
        //     });
        // })();

        //
        // var locals = this.getLocals(self.params, false);
        // yield this.render('posts', locals);
    },

    slugRedirectCtl: function *() {
        var post = blog.getPosts({ slug: this.params.slug || '' });

        if (post) {
            this.status = 301;
            this.redirect('/' + this.params.slug);
        } else {
            yield this.render('404', {
                type: 'slug',
                resource: this.params.slug || ''
            });
        }
    },

    slugCtl: function *() {
        var tags = blog.getTags({ sort: 'desc' }),
            posts = blog.getPosts(),
            post = blog.getPosts({ slug: this.params.slug || '' });

        if (post) {
            yield this.render('slug', {
                tags: tags,
                posts: posts,
                post: post,
                title: post.metadata.title
            });
        } else {
            yield this.render('404', {
                type: 'slug',
                resource: this.params.slug || ''
            });
        }
    },

    getLocals: function(params, isTagged) {
        var tags = blog.getTags({ sort: 'desc' }),
            posts = blog.getPosts(),
            taggedPosts = [],
            activePosts = [],
            pageNumber = params.page || 1,
            maxPages = 1,
            pageOffset  = 0,
            postsPerPage = config.SITE_POSTS_PER_PAGE,
            title = null;

        // make sure we select the correct posts
        if (isTagged) {
            taggedPosts = blog.getPosts({ tag: params.tag || '' });
            activePosts = taggedPosts;
            title = params.tag || null;
        } else {
            activePosts = posts;
        }

        // make sure we don't show too many
        if (activePosts.length < postsPerPage) {
            postsPerPage = activePosts.length;
        }

        // make sure we are within our limits
        maxPages = Math.ceil(activePosts.length / postsPerPage);
        if (pageNumber < 1) pageNumber = 1;
        else if (pageNumber > maxPages) pageNumber = maxPages;

        // make sure we don't show too many on the last page
        pageOffset = (postsPerPage * (pageNumber - 1));
        if (pageOffset + postsPerPage > activePosts.length) {
            postsPerPage = activePosts.length - pageOffset;
        }

        // if no tag is found and we're showing tags
        // then return false so we can 404
        if (isTagged && !taggedPosts) {
            return false;
        } else {
            return {
                tags: tags,
                posts: posts,
                activePosts: activePosts,
                postsPerPage: postsPerPage,
                pageOffset: pageOffset,
                pageNumber: pageNumber,
                maxPages: maxPages,
                params: params,
                title: title
            };
        }
    }
};

module.exports = exports = self;
