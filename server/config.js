module.exports = {
    /* you probably don't want to change this */
    PORT: process.env.PORT || 8000,
    CACHE_UPDATE_INTERVAL: process.env.CACHE_UPDATE_INTERVAL || 15*60000,
    SITE_DIR: process.env.SITE_DIR || 'client',
    POST_DIR: process.env.POST_DIR || 'posts',
    LOGGING: process.env.LOGGING || 2, // 0 none, 1 standard, 2 debug

    EJS_OPEN_DELIMETER: '{%',
    EJS_CLOSE_DELIMETER: '%}',

    GA_TRACKING_CODE: 'UA-8356589-11',

    SITE_NAME: 'Adam K Dean',
    SITE_POSTS_PER_PAGE: 5
};
