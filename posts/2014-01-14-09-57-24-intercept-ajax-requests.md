---title: Intercept AJAX requestsslug: intercept-ajax-requestsdate: 2014-01-14 09:57tags:  - javascript - ajax---Just a snippet today, a reblog, of an article on how to [Hijack AJAX Requests Like A Terrorist](http://verboselogging.com/2010/02/20/hijack-ajax-requests-like-a-terrorist) by [Daniel Huckstep](https://twitter.com/darkhelmetlive).

There are some who say not to modify prototypes because you never know how other libraries will use them, but then there are also some people who think that driving 30 MPH on a 60 MPH road is a good idea, so not everything everyone thinks is a good idea, is a good idea.

    (function(open) {
      XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
        // do some magic
        open.call(this, method, url, async, user, pass);
      };
    })(XMLHttpRequest.prototype.open);

This works perfectly well for intercepting AJAX requests. In my case, it is to modify the URL that is requested by AngularJS.