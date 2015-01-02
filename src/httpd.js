var koa = require('koa'),
    config = require('./config');

var app;

var init = function() {
    app = koa();
    app.use(responseTimeFn);
    app.use(loggerFn);

    // reponse
    app.use(function *(){
        this.body = 'Hello World';
    });
};

var start = function(port) {
    port = port || config.HTTPD_PORT;
    app.listen(port);
    console.log('listening on port %d', port);
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
    start: start
};
