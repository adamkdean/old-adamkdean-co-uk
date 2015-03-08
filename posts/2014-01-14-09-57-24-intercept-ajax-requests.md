---

There are some who say not to modify prototypes because you never know how other libraries will use them, but then there are also some people who think that driving 30 MPH on a 60 MPH road is a good idea, so not everything everyone thinks is a good idea, is a good idea.

    (function(open) {
      XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
        // do some magic
        open.call(this, method, url, async, user, pass);
      };
    })(XMLHttpRequest.prototype.open);

This works perfectly well for intercepting AJAX requests. In my case, it is to modify the URL that is requested by AngularJS.