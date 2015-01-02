module.exports = {
    VERSION: '0.1.0',
    LOGGING: 2, // 0 none, 1 standard, 2 debug
    HTTPD_PORT: process.env.PORT || 8000,
    TEMPLATE_DIR: process.env.TEMPLATE_DIR || '_templates',
    POST_DIR: process.env.POST_DIR || '_posts',

    SITE_NAME: 'Jazzberry, the fruity blog platform',
    SITE_TEMPLATE: 'jazzberry'
};
