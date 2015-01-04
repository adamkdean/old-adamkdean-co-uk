module.exports = {
    VERSION: '0.1.0',

    LOGGING: process.env.LOGGING || 2, // 0 none, 1 standard, 2 debug
    PORT: process.env.PORT || 8000,
    CACHE_UPDATE_INTERVAL: process.env.CACHE_UPDATE_INTERVAL || 60000,
    TEMPLATE_DIR: process.env.TEMPLATE_DIR || '_templates',
    POST_DIR: process.env.POST_DIR || '_posts',

    SITE_NAME: process.env.SITE_NAME || 'Jazzberry, the fruity blog platform',
    SITE_TEMPLATE: process.env.SITE_TEMPLATE || 'jazzberry'
};
