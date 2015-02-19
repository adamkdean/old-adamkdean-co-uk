---title: Simple Navigation Macro for Umbracoslug: simple-navigation-macro-for-umbracodate: 2013-04-15 17:57tags:  - umbraco - macro - razor---I have started working with Umbraco, so a lot of my posts are probably going to be about that for the next few months at least.

This snippet is probably common knowledge for a lot of Umbraco developers, but for me, I had to look on the internet for almost 30 seconds to find it, so to make it easier for me to find it in the future, I'm posting it here. You're welcome future me.

	<ul>
		@{ 
			var homeNode = Model.AncestorOrSelf("Home"); 
		  	var homeClass = Library.If(homeNode.Id == Model.Id, "selected", "");
		}
		
	    <li><a href="@homeNode.Url" class="@homeClass">@homeNode.Name</a></li>		
		
		@foreach(var pageNode in homeNode.Children.Where("Visible"))
		{
			var pageClass = Library.If(pageNode.Id == Model.Id, "selected", "");
			
			<li><a href="@pageNode.Url" class="@pageClass">@pageNode.Name</a></li>
		}
	</ul>

No nesting support but easily addable, [see here](http://umbraco.com/help-and-support/video-tutorials/umbraco-fundamentals/razor-recipes/navigation.aspx).