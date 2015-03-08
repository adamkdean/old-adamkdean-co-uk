---

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