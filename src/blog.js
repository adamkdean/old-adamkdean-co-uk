var S = require('string'),
    fs = require('fs'),
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
            blogFiles.push(element);
        }
    });

    return blogFiles;
}

var parseBlogFiles = function(filenames) {

    for (let i = 0; i < filenames.length; i++) {

        console.log(filenames[i]);
    }

};

var getPosts = function(options) {
    //console.log('getPosts:', options);
};

module.exports = {
    update: update,
    getPosts: getPosts
};
