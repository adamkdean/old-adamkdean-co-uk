var koa = require('koa'),
    Router = require('koa-router'),
    render = require('koa-ejs'),
    path = require('path'),
    config = require('./config');

var app, router;

var locals = {
    config: config,
    version: config.VERSION,
    title: config.SITE_NAME,
    template: config.SITE_TEMPLATE
};

var filters = {
    format: function(time) {
        return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
    }
};

var init = function() {
    app = koa();
    router = new Router();
    app.use(responseTimeFn);
    app.use(loggerFn);
    app.use(router.middleware());

    render(app, {
        root: path.join(__dirname, '..', config.TEMPLATE_DIR, config.SITE_TEMPLATE),
        layout: 'layout',
        viewExt: 'html',
        cache: false,
        debug: true,
        locals: locals,
        filters: filters
    });
};

var start = function(port) {
    port = port || config.HTTPD_PORT;
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

module.exports = exports = {
    init: init,
    start: start,
    use: useRoute,
    get: getRoute,
    post: postRoute,
    update: updateRoute,
    delete: deleteRoute
};
