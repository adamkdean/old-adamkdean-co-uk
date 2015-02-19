---title: Simple Dependency Injection with StructureMapslug: simple-dependency-injection-with-structuremapdate: 2013-08-01 14:13tags:  - c - ioc - dependency-injection---Usually when I think of IoC/Dependency Injection for .NET, I think of [Ninject](http://www.ninject.org/), but today I've been looking at an alternative: [StructureMap](http://docs.structuremap.net/index.html). It claims to be the 'oldest IoC/DI tool for .NET development', in development since 2004, and is [available via NuGet](https://www.nuget.org/packages/StructureMap/) including additional versions for both [MVC3](https://www.nuget.org/packages/StructureMap-MVC3/) and [MVC4](https://www.nuget.org/packages/StructureMap.MVC4/).

The idea with IoC/DI is that you can easily change dependencies of a class without having to trawl through a load of code and change all the hard-coded references from class X to class Y. Think of magic numbers, well this solves magic dependencies.

The example I have below is quite easy to understand. We have a storage class, which will hold onto some data for us. We have an interface which defines  two methods, `StoreData` and `RetrieveData`. We then have a class which emulate a stack (first in, last out) and will utilise our storage class for holding the data.

This could be useful for example if you wanted to read/write objects from a text file, or from a database, or just memory, but didn't want to have to hard-code that functionality in.

Let's start with the interface, nothing confusing here. We'll box everything into an object to make life easier.

    interface IStorageProvider
    {
        void StoreData(object data);
        object RetrieveData();
    }

Next up we'll have our implementation - a very simple class which just holds the data in memory:

    class ExampleStorageProvider : IStorageProvider
    {
        private object data;

        public void StoreData(object data)
        {
            this.data = data;
        }

        public object RetrieveData()
        {
            return this.data;
        }
    }

And now the ObjectStack class. We could have used generics but let's keep this simple. It will pop and push objects like a regular `Stack<object>` but will use a storage class to hold the data.

    class ObjectStack
    {
        private readonly IStorageProvider _storageProvider;

        public ObjectStack(IStorageProvider storageProvider)
        {
            _storageProvider = storageProvider;
        }

        public void Push(object obj)
        {            
            object data = _storageProvider.RetrieveData();
            var stack = (data == null) ? new Stack<object>() : (Stack<object>)data;
            stack.Push(obj);
            _storageProvider.StoreData(stack);
        }

        public object Pop()
        {
            object data = _storageProvider.RetrieveData();
            return (data == null) ? null : ((Stack<object>)data).Pop();
        }
    }

So if we look at the above code, you can see it takes an instance of an `IStorageProvider` class in the constructor. Don't be frightened by the ternary operators, they simply mean `value = (condition) value if true : value if false`. In the push method, it creates a new stack if none already exists, and in the pop method, it returns null if the object doesn't exist.

Now, we could simply create an ObjectStack instance like so:

    var stack = new ObjectStack(new ExampleStorageProvider());

But then we've hard-coded that dependency, and really we don't want to be doing that. We want to be keeping the classes as loosely related as possible. So this is how you use StructureMap to easily map ExampleStorageProvider to IStorageProvider:

    ObjectFactory.Initialize(x => {
        x.For<IStorageProvider>().Use<ExampleStorageProvider>();
    });

That's it! To get an instance of ObjectClass using this dependency injection, it's as simple as: 

    var stack = ObjectFactory.GetInstance<ObjectStack>();

Below is a full example of using the above code to produce results:

    static void Main(string[] args)
    {
        ObjectFactory.Initialize(x => {
            x.For<IStorageProvider>().Use<ExampleStorageProvider>();
        });

        var stack = ObjectFactory.GetInstance<ObjectStack>();

        stack.Push("item one");
        stack.Push("item two");
        stack.Push("item three");
        stack.Pop(); // discard "item three"
        string two = (string)stack.Pop();

        Console.WriteLine(two);
        Console.ReadKey();
    }

Output:

    item two

It's really that easy. For further reading, take a look at [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) and [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control).