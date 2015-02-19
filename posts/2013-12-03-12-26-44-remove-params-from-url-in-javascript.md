---title: Remove params from URL in JavaScriptslug: remove-params-from-url-in-javascriptdate: 2013-12-03 12:26tags:  - regex - javascript---Let us say the param we want to remove is `session` and our URL is `http://www.example.com/?session=lasgfnasolgnasgn&id=500&other=100`. We can remove it like so:

    var oldUrl = "http://www.example.com/?session=lasgfnasolgnasgn&id=500&other=100";
    var newUrl = oldUrl.replace(/&?session=([^&]$|[^&]*)/gi, "");
    console.log(newUrl);

    http://www.example.com/?id=500&other=100

Now let's say we also want to remove other from that URL, we can do that like this: 

    var oldUrl = "http://www.example.com/?session=lasgfnasolgnasgn&id=500&other=100";
    var newUrl = oldUrl.replace(/&?((session)|(other))=([^&]$|[^&]*)/gi, "");
    console.log(newUrl);

    http://www.example.com/?id=500

Excellent.