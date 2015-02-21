---title: Passing extended DbContext class but instantiating the baseslug: passing-extended-dbcontext-class-but-instantiating-the-basedate: 2013-02-14 22:37tags: - csharp - entity-framework - easyauth---Whilst working on [EasyAuth](http://github.com/Imdsm/EasyAuth/) I came across a slight issue, how do I use Entity for the user storage while still allowing the programmer to use their entity classes. I thought, maybe they should be able to extend the EasyAuth DbContext and just pass back their custom version, which EntityUserStore could then use for the storage.

But I couldn't get it to work.

So I took it to a smaller project, had a tinker around, and this actually worked. Even without the commented out bit, it still creates the other tables if need be. Brilliant!

Update: added default type to contextType, and added a parameterless constructor to the base class in case the programmer never gives an extended class. If you don't set the context, it will still work, but it won't create the additional extended tables etc.

    class Program
    {
        static void Main(string[] args)
        {
            UserStorage storage = new UserStorage();
            storage.SetContext(typeof(ExtensionContext));
            storage.AddUser();

            /*using (var context = new ExtensionContext())
            {
                Item item = new Item { ItemName = "My Item" };
                context.Items.Add(item);

                context.SaveChanges();
            }*/

            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }
    }

    public class UserStorage
    {
        private Type contextType = typeof(BaseContext);

        public void AddUser()
        {
            using (var context = (BaseContext)Activator.CreateInstance(contextType))
            {
                User user = new User { Username = "username", Password = "password" };
                context.Users.Add(user);
                context.SaveChanges();
            }
        }

        public void SetContext(Type type)
        {
            contextType = type;
        }
    }

    // ---- base ---------------------------------------------------------------

    public class BaseContext : DbContext
    {
        public BaseContext()
            : base("DefaultConnection")
        {
        }

        public BaseContext(string connectionString = "DefaultConnection")
            : base(connectionString)
        {
        }

        public DbSet<user> Users { get; set; }
    }

    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }

    // ---- extension ----------------------------------------------------------

    public class ExtensionContext : BaseContext
    {
        public ExtensionContext()
            : base("DefaultConnection")
        {
        }

        public DbSet<item> Items { get; set; }
    }

    public class Item
    {
        public int ItemId { get; set; }
        public string ItemName { get; set; }
    }
