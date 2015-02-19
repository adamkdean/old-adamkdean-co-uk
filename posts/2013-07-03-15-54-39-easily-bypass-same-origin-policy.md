---title: Easily bypass Same Origin Policyslug: easily-bypass-same-origin-policydate: 2013-07-03 15:54tags:  - jquery - javascript - ajax - json---If you've ever tried to use AJAX or an iFrame to load another website in javascript and been unable to, it will have been because of the Same Origin Policy. To quote Wikipedia:

> In computing, the same origin policy is an important security concept for a number of browser-side programming languages, such as JavaScript. The policy permits scripts running on pages originating from the same site – a combination of scheme, hostname, and port number – to access each other's methods and properties with no specific restrictions, **but prevents access to most methods and properties across pages on different sites.**

This means that you can only grab files/scripts which are on your current site, which stops you from grabbing external resources. This can be a pain when you're actually trying to do something legitimate. 

If you have backend access, you could always have a PHP page which grabs the URL and prints out the contents, or you could send out ` Access-Control-Allow-Origin:` headers allowing certain sites or even wildcard to open it up fully. But when you don't have this access, when you only have HTML and JS at your disposal, what do you do?

You can use jQuery's `getJSON` function to grab JSON from an external source, and an external provider such as [AnyOrigin](http://anyorigin.com/) or [whateverorigin](http://whateverorigin.org/) will grab the contents for you and return them in a JSON object. Amazing.

    // use jQuery to grab the contents of an url
    var url = encodeURIComponent("http://www.google.com");
    $.getJSON('http://whateverorigin.org/get?url=' + url + '&callback=?', 
        function(data) {
            var html = data.contents;
            // your code here
        }
    );

Works great, though you do have to rely on a third-party. 

If you're okay with that, then this should be okay with you!