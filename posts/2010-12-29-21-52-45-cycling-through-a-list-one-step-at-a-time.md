---title: Cycling through a list, one step at a timeslug: cycling-through-a-list-one-step-at-a-timedate: 2010-12-29 21:52tags:  - c - collections---So the project I am currently working on will have a list of servers (nodes) stored in a generic list (for now), and the node controller will need to cycle through these and send out a request to each one before getting back to the original one. This way, the load can be balanced out among the various nodes.

How to do this seemed so simple but my brain just couldn't ..communicate to me how to do it, possibly it was because next door were having noisy sex which meant I had to change my play list to something louder and fuller, which then not only derailed my thought train but also poured molten steel upon the tracks.

Anyway, the three-minute wonder next door seems to be done now, and I came up with a very nice little indexer.

This is more for my reference than for your education, but you never know, you may have an epiphany!

    using System;
    using System.Collections.Generic;
     
    namespace ListShuffle
    {
        class Program
        {
            static void Main(string[] args)
            {
                ListShuffle ls = new ListShuffle();
                ls.Run();
            }
        }
     
        class ListShuffle
        {
            private int index = 0;
            private List<item> items = new List<item>();
     
            public void Run()
            {
                 
                Item a = new Item("A");
                Item d = new Item("D");
     
                items.Add(a);
                items.Add(new Item("B"));
                items.Add(new Item("C"));
                items.Add(d);
     
                Console.WriteLine(items[index].Name);       // a
                Console.WriteLine(items[NextIndex()].Name); // b
                Console.WriteLine(items[NextIndex()].Name); // c
                Console.WriteLine(items[NextIndex()].Name); // d
     
                items.Remove(a);
     
                Console.WriteLine(items[NextIndex()].Name); // b
                Console.WriteLine(items[NextIndex()].Name); // c
                Console.WriteLine(items[NextIndex()].Name); // d
                Console.WriteLine(items[NextIndex()].Name); // b
                 
                items.Remove(d);
     
                Console.WriteLine(items[NextIndex()].Name); // c
                Console.WriteLine(items[NextIndex()].Name); // b
                Console.WriteLine(items[NextIndex()].Name); // c
                Console.WriteLine(items[NextIndex()].Name); // b
     
                Console.ReadKey();
            }
     
            private int NextIndex()
            {
                if (++index >= items.Count) index = 0;            
                return index;
            }
        }
     
        class Item
        {
            public string Name { get; set; }
            public Item(string name) { Name = name; }
        }
    }

And yes I realise it isn't really a "shuffle" by iStandard's but when you shuffle along, lets say in prison, you don't randomly put your feet anywhere as you move along, randomly selecting where you're going. No, that's called dancing. Shuffling, is moving bit by bit.

And it seems superman next door is feeling brave, glad I got this done whilst he had a break.

FML