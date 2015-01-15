var koa = require('koa'),
    Router = require('koa-router'),
    serve = require('koa-static'),
    ejs = require('koa-ejs'),
    path = require('path'),
    url = require('url'),
    marked = require('marked'),
    config = require('./config');

var app, router, renderViewModel;

var locals = {
    config: config,
    version: config.VERSION,
    title: config.SITE_NAME_LONG,
    template: config.SITE_TEMPLATE,
    siteNameLong: config.SITE_NAME_LONG,
    siteNameShort: config.SITE_NAME_SHORT,
    nav: config.SITE_NAV
};

var filters = {
    formatDate: function(date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    },
    formatMarkdown: function(text) {
        console.log(text);
        return marked(text);
    }
};

var init = function() {
    // setup the model before it's used
    renderViewModel = {
        root: path.join(__dirname, '..', config.TEMPLATE_DIR, config.SITE_TEMPLATE),
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
};

var start = function(port) {
    port = port || config.PORT;
    app.listen(port);
    console.log('listening on port %d', port);
};

var useRoute = function(route, fn) {
    router.use(route, fn);
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
    use: useRoute,
    get: getRoute,
    post: postRoute,
    update: updateRoute,
    delete: deleteRoute
};
