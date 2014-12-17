var fs = require('fs'),
    S = require('string');

var config = require('./config');

var update = function() {
    var blogFiles = getBlogFiles();
    var posts = parseBlogFiles(blogFiles);

};

var getBlogFiles = function() {
    var allFiles = fs.readdirSync(config.post_dir),
        blogFiles = [];

    allFiles.forEach(function(element, index, array) {
        if (element.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})-([a-z-]+)$/i)) {
            blogFiles.push(element);
        }
    });

    return blogFiles;
}

var parseBlogFiles = function(filenames) {
    console.log(filenames);
};

var getPosts = function(options) {
    console.log('getPosts: ', options);
};

module.exports = {
    update: update,
    getPosts: getPosts
};
