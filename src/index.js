var koa = require('koa'),
    blog = require('./blog'),
    config = require('./config');

var app = koa();

// get the blog started
blog.startUpdateCycle();

// x-response-time
app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
    if (config.LOGGING >= 2) console.log('X-Response-Time: %s ms', ms);
});

// logger
app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    if (config.LOGGING >= 1) console.log('%s %s - %s', this.method, this.url, ms);
});

// reponse
app.use(function *(){
    this.body = 'Hello World';
});

app.listen(config.PORT);
console.log('listening on port %d', config.PORT);
