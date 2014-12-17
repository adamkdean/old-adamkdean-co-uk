var S = require('string'),
    fs = require('fs'),
    async = require('async'),
    config = require('./config');

var update = function() {
    var validFilenames = [],
        allFilenames = fs.readdirSync(config.post_dir);

    allFilenames.forEach(function(element, index, array) {
        if (element.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})-([a-z-]+)$/i)) {
            validFilenames.push(config.post_dir + '/' + element);
        }
    });

    async.map(validFilenames, readFileAsync, function(err, results) {
        if (err !== undefined) {
            console.log('Error reading blog files:', err);
            return;
        }

        parseBlogData(results);
    });
};

var readFileAsync = function(filename, callback) {
    fs.readFile(filename, 'utf8', callback);
};

var parseBlogData = function(data) {
    console.log('data', data);
};

var getPosts = function(options) {
    //console.log('getPosts:', options);
};

module.exports = {
    update: update,
    getPosts: getPosts
};
