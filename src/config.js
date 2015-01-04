module.exports = {
    /* you probably don't want to change this */
    VERSION: '0.1.0',
    PORT: process.env.PORT || 8000,
    CACHE_UPDATE_INTERVAL: process.env.CACHE_UPDATE_INTERVAL || 60000,
    TEMPLATE_DIR: process.env.TEMPLATE_DIR || '_templates',
    POST_DIR: process.env.POST_DIR || '_posts',
    LOGGING: process.env.LOGGING || 2, // 0 none, 1 standard, 2 debug

    /* you probably should change these */
    SITE_NAME_LONG: 'Jazzberry, the fruity blog platform',
    SITE_NAME_SHORT: 'Jazzberry',
    SITE_TEMPLATE: 'jazzberry',
    SITE_NAV: [
        { title: 'Home', url: '/' },
        { title: 'Tags', url: '/tags' },
        { title: 'Test 1', url: '/tag/test' }
    ]
};
