---title: Cloning objects in JavaScriptslug: cloning-objects-in-javascriptdate: 2013-11-22 09:17tags:  - javascript - jquery---Just a quick snippet post today. 

A great way to clone objects in JavaScript and break references is to serialize and deserialize the object. The process of converting it to a JSON string and back into an object severs any references. Unfortunately, it also breaks certain types such as `Date` and probably `RegEx` too.

    var clone = JSON.parse(JSON.stringify(original));

A better way (I've found) to clone objects while retaining types is to use [`jQuery.extend`](http://api.jquery.com/jQuery.extend/).

    // Shallow copy
    var newObject = jQuery.extend({}, oldObject);

    // Deep copy
    var newObject = jQuery.extend(true, {}, oldObject);

There are other, quicker ways, but when you can run [120,000 deep copies a second](http://jsperf.com/cloning-an-object/2), is that extra microsecond really worth it?