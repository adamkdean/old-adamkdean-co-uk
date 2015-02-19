---title: Force JSON with WebAPIslug: force-json-with-webapidate: 2013-09-18 11:17tags:  - webapi - json - api - c---Sometimes when you call a WebAPI through the browser, you'll be served XML. This may make it easier to read, but it's really not helping us when all we really want is JSON. Putting the following snippet into the end of Application_Start() in Global.asax.cs will force your WebAPI application to always send JSON.

    GlobalConfiguration.Configuration.Formatters.Clear();
    GlobalConfiguration.Configuration.Formatters.Add(new JsonMediaTypeFormatter());

As simple as that.