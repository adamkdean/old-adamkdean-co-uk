var S = require('string'),
    fs = require('fs'),
    yaml = require('js-yaml'),
    async = require('async'),
    config = require('./config');

var cachedBlogPosts = [];

var updateAsync = function(callback) {
    var validFilenames = [],
        allFilenames = fs.readdirSync(config.POST_DIR);

    allFilenames.forEach(function(element, index, array) {
        if (element.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})-([a-z-]+)$/i)) {
            validFilenames.push(config.POST_DIR + '/' + element);
        }
    });

    async.map(validFilenames, readFileAsync, function(err, readResults) {
        if (err !== undefined) {
            console.log('Error reading blog files:', err);
            return;
        }

        parseBlogDataAsync(readResults, function(parseResults) {
            // do some indexing

            cachedBlogPosts = parseResults;
            console.log('updated cache with %d blog posts', cachedBlogPosts.length);

            callback();
        });
    });
};

var readFileAsync = function(filename, callback) {
    fs.readFile(filename, 'utf8', callback);
};

var parseBlogDataAsync = function(data, callback) {
    var re = /---[\n\r]+([\s\S]*)[\n\r]+---[\n\r]+([\s\S]*)/;
    var posts = [];

    for(let i = 0; i < data.length; i++) {
        let bits = re.exec(data[i]),
            metadata = yaml.safeLoad(bits[1] || ''),
            content = bits[2] || '';

        posts.push({
            original: data[i],
            metadata: metadata,
            content: content
        });
    }

    callback(posts);
};

var getPosts = function(options) {
    console.log('getPosts:', options);

    return cachedBlogPosts;
};

module.exports = exports = {
    updateAsync: updateAsync,
    getPosts: getPosts
};
