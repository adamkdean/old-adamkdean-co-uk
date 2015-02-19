---title: Simple abstract classes explainedslug: simple-abstract-classes-explaineddate: 2010-09-21 22:39tags:  - abstract - abstract-class - c---Blogular activity has suffered a little here; but setting up a workshop and devising plans to build steam engine in said workshop will do that to you. Today some simple code, written to simplify showing abstract classes. Every tutorial I see they throw in stupid code that isn't really needed to show the primal functionality of abstract classes. So here is an example that has nothing more than what it needs.

    class Program
    {
        static void Main()
        {
            // here we create a happy and pass it to print mood to screen
            // happy is of type happy but also of type mood
            Happy happy = new Happy();
            PrintMoodToScreen(happy);
     
            // again, we create a mood, this one is a sad mood but still
            // a mood nonetheless
            Sad sad = new Sad();
            PrintMoodToScreen(sad);
     
            Console.ReadKey();
        }
     
        // here we take an object of the type Mood, which means we don't require
        // one method for sad, one method for happy and one for all others
        // and it means we dont have to box them into objects either
        static void PrintMoodToScreen(Mood mood)
        {
            mood.PrintMood();
        }
    }

As you can see we pass the objects to a single method taking a Mood type, not Sad or Happy. Think about your local vets, you may have a GermanShepherd or a Poodle, but they are all derived from the Dog class. If that isn't enough, think about coffee, beautiful coffee, we have Coffee, then we have InstantCoffee and GroundCoffee, and then we have KenkoInstantCoffee and NescafeInstantCoffee, each would be a child of the other, Coffee -> InstantCoffee -> KenkoInstantCoffee etc. You could write a method to only accept instant coffee and then takes water and milk and makes a nice quick 'normal' brew.

    abstract class Mood
    {
        // protected means it's accessible to Mood, and to anything derived
        // from it, i.e. sad, happy, etc
        protected string CurrentMood { get; set; }
     
        // here we write a method to print the mood, we only need to code
        // it once, that's one reason why abstract classes exist
        public void PrintMood()
        {
            Console.WriteLine(CurrentMood);
        }
    }
     
    // we create the happy class and derive from mood
    class Happy : Mood
    {
        public Happy()
        {
            // we set the protected property, which is accessible to us
            // but not to anyone using a mood object
            CurrentMood = "Current Mood is Happy :)";        
        }
    }
     
    class Sad : Mood
    {
        public Sad()
        {
            // cheer up Sad class!
            CurrentMood = "Current Mood is Sad :(";
        }
    }

If more explaining is needed, then I'm really not sure if there's any hope for you.

Good luck!