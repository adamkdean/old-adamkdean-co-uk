var marked = require('marked');

var renderer = new marked.Renderer();

renderer.heading = function (text, level) {
    // the idea here is that we don't want to be throwing out
    // h1's like it's a street carnival, so we knock them all
    // down a couple o' pegs, so offset of 3 means h4 and down
    var headerLevelOffset = 3,
        headerLevel = headerLevelOffset + level,
        tagOpen = '<h' + headerLevel + '>',
        tagClose = '</h' + headerLevel + '>';
    return tagOpen + text + tagClose;
},

console.log(marked('# this is an example', { renderer: renderer }));
