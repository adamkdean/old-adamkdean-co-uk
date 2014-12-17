var S = require('string'),
    fs = require('fs'),
    async = require('async'),
    config = require('./config');

var update = function() {
    var blogFiles = getBlogFiles();
    var posts = parseBlogFiles(blogFiles);

    // do something here
};

var getBlogFiles = function() {
    var allFiles = fs.readdirSync(config.post_dir),
        blogFiles = [];

    allFiles.forEach(function(element, index, array) {
        if (element.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})-([a-z-]+)$/i)) {
            blogFiles.push(config.post_dir + '/' + element);
        }
    });

    return blogFiles;
}

var readFileAsync = function(filename, callback) {
    fs.readFile(filename, 'utf8', callback);
};

var parseBlogFiles = function(filenames) {

    async.map(filenames, readFileAsync, function(err, results) {
        console.log('err', err);
        console.log('results', results);
    });

};

var getPosts = function(options) {
    //console.log('getPosts:', options);
};

module.exports = {
    update: update,
    getPosts: getPosts
};
