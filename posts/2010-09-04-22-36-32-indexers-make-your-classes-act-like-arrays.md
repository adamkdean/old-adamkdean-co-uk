---title: Indexers - make your classes act like arraysslug: indexers-make-your-classes-act-like-arraysdate: 2010-09-04 22:36tags: - csharp - hashtable - indexers---Indexers are great, I've only really started using them consciously today, but they're a great discovery I'll be sure to incorporate into more of my code from now on.

As you can see here, we have a class, but we access a value as if it was an array, or a `Hashtable`. Just think of how you could use this!

    VarClass vc = new VarClass();
    vc["key"] = "value";
    Console.WriteLine(vc["key"].ToString());

The code is really simple too, it's simply like a property with an input, here we just put a layer on top of a Hashtable, you can of course add something more useful, but this shows you how it works:

    class VarClass
    {
        private Hashtable ht = new Hashtable();

        public object this[object key]
        {
            get
            {
                return ht[key];
            }
            set
            {
                ht[key] = value;
            }
        }
    }  

As you can see, you take the object they put within the square brackets as a parameter, and you make a property but as the name you put the keyword this, referring to the actual class object.

I just think it's so simply, yet so awesome..

I actually came across this whilst writing a simple Hashtable clone for someone over at Dream.In.Code. For the sake of your dying curiosity I will post the awesome class here:

    class HashtableEx
    {
        private List<object> keys = new List<object>();
        private List<object> values = new List<object>();

        public object this[object key]
        {
            get
            {
                int index = keys.IndexOf(key);
                if (index == -1) return null;
                else return values[index];
            }
            set
            {
                if (keys.Contains(key))
                {
                    int index = keys.IndexOf(key);
                    values[index] = value;
                }
                else
                {
                    keys.Add(key);
                    values.Add(value);
                }
            }
        }

        public object Get(object key)
        {
            int index = keys.IndexOf(key);
            return values[index];
        }

        public void Add(object key, object value)
        {
            keys.Add(key);
            values.Add(value);
        }

        public void Remove(object key)
        {
            int index = keys.IndexOf(key);
            keys.RemoveAt(index);
            values.RemoveAt(index);
        }

        public void Clear()
        {
            keys = new List<object>();
            values = new List<object>();
        }
    }

Use it like so:

    static void Main()
    {
        HashtableEx ht = new HashtableEx();

        ht["hello"] = "world";

        Console.WriteLine("Value of \"hello\": {0}", ht["hello"]);
        Console.WriteLine("Type of \"hello\": {0}", ht["hello"].GetType());

        Console.ReadKey();
    }

Which gives you the output:

    Value of "hello": world
    Type of "hello": System.String
