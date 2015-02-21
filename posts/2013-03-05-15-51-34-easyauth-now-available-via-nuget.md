---title: EasyAuth now available via NuGetslug: easyauth-now-available-via-nugetdate: 2013-03-05 15:51tags: - easyauth - asp-net-mvc - nuget - csharp---Now that my new website is live and all working, I've had a bit of time to put [EasyAuth](https://github.com/Imdsm/EasyAuth) on NuGet so everyone/anyone can use it and also so that I can more easily work with projects that do use it (namely this website).

EasyAuth is a simple, secure, and easy to use lightweight alternative to ASP.NET Membership that I have been working on over the last month or two, and this website actually uses it for the administrative authentication.

At the moment it only supports Code-First Entity Framework as a data provider, but my good friend and scholar [@LewisArdern](https://twitter.com/LewisArdern) is currently working on adding [RavenDB](http://ravendb.net/) support to it.

### Install

To install EasyAuth via NuGet, open up your Package Manager Console, and type:

`PM> Install-Package EasyAuth`

Once installed, EasyAuth takes minimal amount of setup.

In `global.asax`, you will need to initialise the `UserStore` and pass that to the `Authentication` class. We will be using the `EntityUserStore` for now.

Note that it is possible to extend `EasyAuth.Storage.UserStoreContext` to enable your website to use the same database as `EntityUserStore`. I will add a tutorial in the coming days to show how, but you can find an example of it in the [source for this website](https://github.com/Imdsm/PersonalWebsite).

The following examples should help you get an idea of how to use EasyAuth. Any questions, please leave a comment.

### global.asax

    namespace EasyAuthExample
    {
        public class MvcApplication : System.Web.HttpApplication
        {
            // store the instance of the selected UserStore here
            static IUserStore UserStore = EntityUserStore.Instance;

            protected void Application_Start()
            {
                Authentication.UserStore = UserStore;
            }

            protected void Application_BeginRequest(Object sender, EventArgs e)
            {
                // we have to give feed the httpcontext through to the
                // auth class at the beginning of each page request
                Authentication.HttpContext = HttpContext.Current;
            }
        }
    }

### Web.config

Make sure you remember to put the ConnectionString in for your selected data storage.

    <connectionStrings>
        <add name="DefaultConnection"
            providerName="System.Data.SqlClient"
            connectionString="Data Source=(LocalDb)\v11.0;Initial Catalog=EasyAuthExample;Integrated Security=SSPI;AttachDBFilename=|DataDirectory|\EasyAuthExample.mdf" />
    </connectionStrings>

Of course you can use other connection strings/data sources, as long as they're valid.

### HomeController.cs

Now you create a controller as you would with any regular MVC application, but instead of using the `[Authorize]` and `[AllowAnonymous]` attributes, you simply use `[EzAuthorize]` and `[EzAllowAnonymous]` instead.

Authenticate a user with `Authentication.Login(username, password)`, and log them out with `Authentication.Logout();`.

    namespace EasyAuthExample.Controllers
    {
        [EzAuthorize]
        public class HomeController : Controller
        {
            //
            // GET: /Home/

            [EzAllowAnonymous]
            public ActionResult Index()
            {
                return View();
            }

            //
            // GET: /Home/Login

            [EzAllowAnonymous]
            public ActionResult Login()
            {
                return View();
            }

            //
            // POST: /Home/Login

            [HttpPost]
            [EzAllowAnonymous]
            public ActionResult Login(LoginModel model)
            {
                if (ModelState.IsValid &&
                        Authentication.Login(model.Username, model.Password))
                {
                    return RedirectToAction("MembersOnly", "Home");
                }

                ViewBag.Message = "Invalid user credentials";
                return View(model);
            }

            //
            // GET: /Home/Logout

            public ActionResult Logout()
            {
                Authentication.Logout();
                return RedirectToAction("Index", "Home");
            }

            //
            // GET: /Home/MembersOnly

            public ActionResult MembersOnly()
            {
                return View();
            }
        }
    }

And that's it!

## Create, Read, Update, Delete

It's easy to create, read, update and delete users.

### Create Users

Adding users is really easy, and for now just takes two arguments.

`void AddUser(string username, string password);`

    // first we check that the username doesn't already exist
    if (!Authentication.UserStore.UserExistsByUsername(username))
    {
        // then we simply add them to the database
        Authentication.UserStore.AddUser(username, password);
    }

### Read Users

The following methods are available to you via `Authentication.UserStore`.

    User GetUserById(int id);
    User GetUserByUsername(string username);
    List<User> GetAllUsers();

Example:

    User test = Authentication.UserStore.GetUserByUsername("TestUser");
    int testId = test.UserId;

    User test = Authentication.UserStore.GetUserById(14);
    string testUsername = test.Username;

    List<User> users = Authentication.UserStore.GetAllUsers();
    foreach(var user in users)
    {
        DoSomething.With(user.Username);
    }

### Update Users

Updating users is really easy too. Make sure you pass the correct userId and User object!

`void UpdateUserById(int id, User user);`

    User test = Authentication.UserStore.GetUserByUsername("TestUser");
    test.Username = "IFancyANewName";
    Authentication.UserStore.UpdateUserById(test.UserId, test);

### Delete Users

When you have to delete users, sad as it is, you can do that too.

`void DeleteUserById(int id);`

    User test = Authentication.UserStore.GetUserByUsername("TestUser");
    Authentication.UserStore.DeleteUserById(test.UserId);


Enjoy!
