---title: Use jQuery to see if an element existsslug: use-jquery-to-see-if-an-element-existsdate: 2014-01-17 10:28tags:  - javascript - jquery---You can use jQuery to see if an element exists by checking if the length of the jQuery object is > zero.

    var exists = $('.your-selector-here').length > 0;

Probably the shortest snippet so far.