---title: Enable AngularJS HTML5 Routing on IISslug: enable-angularjs-html5-routing-on-iisdate: 2013-09-18 14:57tags:  - url-rewrite - angularjs - iis---AngularJS has the ability to use HTML5 routing, which means that rather than having your application using a hash (#) sign and then the route, it can instead get rid of the hash and still function as a Single Page Application. For example:

    Without HTML5 routing: http://domain.com/#/user/15 -> http://domain.com/index.html
    With HTML5 routing: http://domain.com/user/15 -> http://domain.com/index.html

For this to work though, you'll need to set up some sort of server-side url rewriting. To do this in IIS, you should first download and install the URL Rewrite module (Web Platform Installer will have it). After that, we need to set up some rules. 

If you want the step by step version, follow this:

1. Open up the site in question and go to URL Rewrite module.
2. Add an inbound rule, name it "AngularJS Conditions". Set the pattern to match all directories you want to exclude, I use `(app/.*|assets/.*|common/.*)`. Change the action to `None`, and click Apply.
3. Add another inbound rule, name it "AngularJS Wildcard". Set the pattern to `(.*)`, keep the action as `Rewrite` and put in the relative URL to your `index.html`, and click Apply.
4. Test your site. 
5. If your css/js requests are being rewritten, you have a problem with your conditions rule. 
6. If you're getting 404.0 errors, you have a problem with your wildcard rule. 
5. Get back to work.

If you're impatient and just want the web.config, well, here you go:

    <?xml version="1.0" encoding="UTF-8"?>
    <configuration>
      <system.webServer>
        <rewrite>
          <rules>
            <clear />
            <rule name="AngularJS Conditions" stopProcessing="true">
              <match url="(app/.*|assets/.*|common/.*|modules/.*|config/.*)" />
              <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
              <action type="None" />
            </rule>
            <rule name="AngularJS Wildcard" enabled="true">
              <match url="(.*)" />
              <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
              <action type="Rewrite" url="index.html" />
            </rule>
          </rules>
        </rewrite>
      </system.webServer>
    </configuration>

You should now be set up for HTML5 routing.