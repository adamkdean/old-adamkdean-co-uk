---title: Detect printing with CSS & ASP.NETslug: detect-printing-with-css-asp-netdate: 2010-09-24 22:42tags:  - asp-net-webforms - printing---So, as in my previous post, I had an awesome idea of how to detect people printing a page of a website. Basically, when they go to print from our site, they get a different layout, that doesn't have anything that looks like a site. So surely if I just put a little tracker file in between the CSS file and the request, that'd work like a charm, right?

Wrong. In order to protect peoples privacy, all css files are now downloaded at page load, so every view registered as a print. Naturally, I checked what the bearded men of Google had to say, which wasn't much. HTC files, printer drivers and one even suggested something about an intranet... 

So I posted on Dream.In.Code, asked the masses, and even RDC'd into my server to ask in #css on freenode irc.. then my own question gave me the answer.

To detect when someone prints a page on your site you just use CSS, it's really simple actually. Think, they will load the CSS when the page loads, but they won't process it unless someone prints, and you can use css to request images.. but .. how does CSS know if an image is an image or if it is a microwave meal? It doesn't until it requests it!

Don't forget to reference your stylesheet!

    <link rel="stylesheet" href="print.css" media="print" type="text/css" />

So you just put your script inside an url()!!

    body { background: url(PrintTracker.aspx); }

Works brilliantly, and the 'image' is requested every single time a page is printed, even the same one twice!

Awesome? I agree.

**Update:** It has been noted that print preview will fire this also. Bear that in mind.