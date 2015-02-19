---title: Enable cross-origin resource sharing (CORS) in IISslug: enable-cross-origin-resource-sharing-cors-in-iisdate: 2013-09-18 12:21tags:  - iis - webapi - cors - web-config---If you're hosting your API on a different domain to your app, such as api.domain.com, you may be hitting into some cross-origin request roadblocks. In IIS, this is pretty easy to fix -- or well -- disable.

In your WebAPI project's web.config, put in the following:

    <httpProtocol>
        <customHeaders>
            <add name="Access-Control-Allow-Origin" value="*" />
            <add name="Access-Control-Allow-Headers" value="Origin, X-Requested-With, Content-Type, Accept" />
        </customHeaders>
    </httpProtocol>

This will enable cross-origin resource sharing (CORS) and allow you to get back to work.