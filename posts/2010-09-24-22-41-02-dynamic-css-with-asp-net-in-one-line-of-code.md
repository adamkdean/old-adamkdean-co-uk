---title: Dynamic CSS with ASP.NET - in one line of codeslug: dynamic-css-with-asp-net-in-one-line-of-codedate: 2010-09-24 22:41tags: - csharp - asp-net-webforms---Whether you want a separate sheet for each browser, or you want to track when people print a page from your site (as is my case), how do you get code to run in a CSS file? You can't. How do you get an ASPX file to serve up CSS? Well, you can't. But like House MD, I have the answer and I'll tell you eventually.

What you want to do is create an ASPX file, and in the Page_Load event, write whatever tracking or logic code you want, then simply redirect the page without any output.

    protected void Page_Load(object sender, EventArgs e)
    {
        // code here
        Response.Redirect("style.css", true);
    }

And there you have it, Dynamic CSS with ASP.NET - in one line of code.
