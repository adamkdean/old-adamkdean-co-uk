var koa = require('koa'),
    Router = require('koa-router'),
    serve = require('koa-static'),
    ejs = require('koa-ejs'),
    path = require('path'),
    url = require('url'),
    moment = require('moment'),
    marked = require('marked'),
    config = require('./config');

var app, router, renderViewModel, markedRenderer;

var locals = {
    config: config
};

var filters = {
    formatDateString: function(dateString) {
        return moment(new Date(dateString)).format('dddd, D MMMM YYYY');
    },
    formatMarkdown: function(text) {
        return marked(text, { renderer: markedRenderer });
    }
};

var init = function() {
    // setup the model before it's used
    renderViewModel = {
        root: path.join(__dirname, '..', config.SITE_DIR),
        layout: 'layout',
        viewExt: 'html',
        cache: false,
        debug: true,
        locals: locals,
        filters: filters,
        open: config.EJS_OPEN_DELIMETER || '{{',
        close: config.EJS_CLOSE_DELIMETER || '}}'
    };

    app = koa();
    router = new Router();
    app.use(responseTimeFn);
    app.use(loggerFn);
    app.use(extendLocalsFn);
    app.use(router.middleware());
    app.use(serve(renderViewModel.root));
    ejs(app, renderViewModel);

    markedRenderer = new marked.Renderer();
    markedRenderer.heading = function (text, level) {
        // the idea here is that we don't want to be throwing out
        // h1's like it's a street carnival, so we knock them all
        // down a couple o' pegs, so offset of 3 means h4 and down
        // also, stop at h6 because h7 isn't real, ok?
        var headerLevelOffset = 2,
            headerLevel = (headerLevelOffset + level < 7) ? headerLevelOffset + level : 6,
            tagOpen = '<h' + headerLevel + '>',
            tagClose = '</h' + headerLevel + '>';
        return tagOpen + text + tagClose;
    };
};

var start = function(port) {
    port = port || config.PORT;
    app.listen(port);
    console.log('listening on port %d', port);
};

var allRoute = function(route, fn) {
    router.all(route, fn);
};

var getRoute = function(route, fn) {
    router.get(route, fn);
};

var postRoute = function(route, fn) {
    router.post(route, fn);
};

var updateRoute = function(route, fn) {
    router.update(route, fn);
};

var deleteRoute = function(route, fn) {
    router.delete(route, fn);
};

var responseTimeFn = function *(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');

    if (config.LOGGING >= 2) {
        console.log('X-Response-Time: %s ms', ms);
    }
};

var loggerFn = function *(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;

    if (config.LOGGING >= 1) {
        console.log('%s %s - %s', this.method, this.url, ms);
    }
};

var extendLocalsFn = function *(next) {
    locals.req = this.req;
    locals.res = this.res;
    locals.url = url.parse(this.req.url);

    yield next;
};

module.exports = exports = {
    init: init,
    start: start,
    all: allRoute,
    get: getRoute,
    post: postRoute,
    update: updateRoute,
    delete: deleteRoute
};
