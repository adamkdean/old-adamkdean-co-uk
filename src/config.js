module.exports = {
    /* you probably don't want to change this */
    VERSION: '0.1.0',
    PORT: process.env.PORT || 8000,
    CACHE_UPDATE_INTERVAL: process.env.CACHE_UPDATE_INTERVAL || 60000,
    SITE_DIR: process.env.SITE_DIR || '_site',
    POST_DIR: process.env.POST_DIR || '_posts',
    LOGGING: process.env.LOGGING || 2, // 0 none, 1 standard, 2 debug

    EJS_OPEN_DELIMETER: '{{',
    EJS_CLOSE_DELIMETER: '}}',

    /* you probably should change these */
    SITE_URL: 'http://localhost:' + (process.env.PORT || 8000) + '/',
    SITE_NAME_LONG: 'Adam K Dean - Personal Website',
    SITE_NAME_SHORT: 'Adam K Dean',
    SITE_NAV: [
        { title: 'Home', url: '/' },
        { title: 'General', url: '/tag/general' },
        { title: 'Life', url: '/tag/life' },
        { title: 'Work', url: '/tag/work' }
    ]
};
