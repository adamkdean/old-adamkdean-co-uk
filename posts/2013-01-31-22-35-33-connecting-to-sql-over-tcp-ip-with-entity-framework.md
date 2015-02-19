---title: Connecting to SQL over TCP/IP with Entity Frameworkslug: connecting-to-sql-over-tcp-ip-with-entity-frameworkdate: 2013-01-31 22:35tags:  - entity-framework - c - sql---So this has caused me quite a headache, but I've finally managed to get it working. Code First Entity connecting to remote SQL server.

First the model classes:

    public class Blog
    {
        public int BlogId { get; set; }
        public string Name { get; set; }
     
        public virtual List<post> Posts { get; set; }
    }
     
    public class User
    {
        public int UserId { get; set; }
        public string DisplayName { get; set; }
    }
     
    public class Post
    {
        public int PostId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
     
        public int BlogId { get; set; }
        public virtual Blog Blog { get; set; }
     
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }

And the context that holds them together, notice how it has a connection string name in the constructor:

    public class BlogContext : DbContext
    {
        public BlogContext() : base("name=BlogContextConnection") { }
     
        public DbSet<blog> Blogs { get; set; }
        public DbSet<post> Posts { get; set; }
        public DbSet<user> Users { get; set; }
    }

Which relates to this connection string, which was quite a pain to get working. Note that this is using SqlClient not EntityClient:

    <connectionStrings>
      <add name="BlogContextConnection"
            providerName="System.Data.SqlClient"
            connectionString="Server=SERVER;Database=Blog;Integrated Security=False;User Id=USER;Password=PASSWORD;" />
    </connectionStrings>

Of course, you can connect with windows auth if you wish, but I'm doing this over networks LAN and internet so I'm not using integrated security. Just yet.