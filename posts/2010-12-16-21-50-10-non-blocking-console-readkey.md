---title: Non-blocking Console.ReadKey()slug: non-blocking-console-readkeydate: 2010-12-16 21:50tags: - csharp - console-application---Just a quick snippet for today.

Have you ever written a quick console app to test something, and wanted it to loop until you press an escape button? But Console.ReadKey() blocks, so you can't really use it...or can you?

    while (true)
    {
        while (!Console.KeyAvailable)
        {
            // do work
        }

        Console.WriteLine("Press Q to quit or any other key to continue..");
        if (Console.ReadKey().Key == ConsoleKey.Q) break;
    }

Double while loops does seem somehow wrong to me, I can't help but feel a sense of wrong doing when I look at it knowing it's my code, and my heart rate does increase at the prospect of reading about myself on Daily WTF and Coding Horror, but it works okay when your work doesn't matter what order it's called in.

I used this particular loop for writing to a file over and over and over to see if the size of the file has any performance issues with StreamWriter, which I can report it didn't.. not at 6GB of Lorem Ipsum anyway.

So, there you go, Console.KeyAvailable simply checks if a key is available to read, and if so, it reads it and checks if it's Q for Quitters. Pretty simple.

More snippets to follow.

Merry Christmas!
