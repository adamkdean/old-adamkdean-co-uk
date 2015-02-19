---title: Home Link Macro for Umbracoslug: home-link-macro-for-umbracodate: 2013-04-16 14:58tags:  - razor - macro - umbraco---Another Umbraco related post today, and another macro. This time it's about creating a home link for site titles, such as when you click the name of a blog and it takes you back to the index.

This requires a bit of configuration, unfortunately, it can't all be done programmatically. The first step is to create a macro from the developers tab. To do this you go to the *developers* tab, right click `Scripting Files`, click create, and then give the macro a name such as "Home Link".

![Create the macro](http://i.imgur.com/OcZ4Woz.png)

This should create two files for you, `HomeLink.cshtml` under Scripting Files and `Home Link` under Macros. Go to the Macros tab, and select the macro Home Link. This should load up the Macro editor.

![Created files](http://i.imgur.com/ucg6eh3.png)

*Important step!* Now we want to add a parameter for the name of the site, which we will pass to the macro from the page. Select the Parameters tab, and add a parameter with the Alias `SiteName`, Name `SiteName`, and Type `text`. Remember to click Add.

![Parameters](http://i.imgur.com/Kk4G7RO.png)

Now go back to `HomeLink.cshtml`, and put in the following code:

	@{ 
		var homeNode = Model.AncestorOrSelf("Home");
		var siteName = Parameter.SiteName;
	}

	<a href="@homeNode.Url">@siteName</a>

We first get the home node, which we will want to link to, from which we can get the `Url`. We then get the parameter that we've passed by using `Parameter.NameOfParameterHere`. After that it's back to HTML and a simple link will suffice. We can then enclose the macro in whatever tags we want.

That's the macro done. Now for using it. In your template, all you need to do is use this snippet, remembering to fill in the name of the site:

    <umbraco:Macro SiteName="Your Site Name" Alias="HomeLink" runat="server" />

And bingo, you're up and away.

# Taking it further

I'm not happy with hard coding it, I want it to be easily changeable. So when creating my document type tree, I made all document types derive from a Master type, within which I have a few inheritable properties such as the meta description, keywords etc, but also a `siteName` property.

If we pass this property to the macro, then we don't need to worry about changing the templates whenever the site name changes.

To pass a property, you use something called `bracket syntax`, which looks like this:

    <umbraco:Macro SiteName="[$siteName]" Alias="HomeLink" runat="server" />

You put the name of the parameter as the attribute title and property name prefixed with a $ and enclosed in square brackets as the attribute value. `ParameterName="[$nameOfProperty]"`. So if you wanted to pass your *bodyText* as the *InputValue* paramter, you would use `InputValue="[$bodyText]"`.

Pretty simple really. Just make sure you add the parameters to the macro or they won't get through!

# A quick note ...

Now, something I must mention is that there are a few different prefixes for these `bracket` attributes.

If the property is just on the current page, you can simply access it using the hash/pound character: `[#propertyName]`, but if the property inherits from a parent page, you need to use the recursive prefix which is a dollar sign, like so: `[$propertyName]`. 

This means that if the value of the property is empty, it will look at the value for the parent page, and the parent page above that. For more information, see [umbraco:macro element](http://our.umbraco.org/wiki/reference/templates/umbracomacro-element) at our.umbraco.org.