var fs = require('fs'),
    S = require('string');
    
var cwd = process.cwd(),
    files = fs.readdirSync(cwd + '/_posts/'),
    posts = [];

files.forEach(function(element, index, array) {
    if (element.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})-([a-z-]+).md$/i)) {
        posts.push(element);
    }
});

console.log(posts);