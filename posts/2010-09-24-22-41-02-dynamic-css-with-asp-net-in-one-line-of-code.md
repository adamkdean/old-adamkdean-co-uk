---

What you want to do is create an ASPX file, and in the Page_Load event, write whatever tracking or logic code you want, then simply redirect the page without any output.

    protected void Page_Load(object sender, EventArgs e)
    {
        // code here
        Response.Redirect("style.css", true);
    }

And there you have it, Dynamic CSS with ASP.NET - in one line of code.