---title: Replicating c# params keyword in C (GNU-C99)slug: replicating-c-params-keyword-in-c-gnu-c99date: 2011-01-11 21:59tags:  - c---Just like Julian Assange is jumping from country to country, brothel to brothel, being hunted like a heretic, my uptime project is sending me from one job to another, programming to web design to server admin to flash design.. well the flash design has yet to come, and I don't look forward to that day!

For the last 5 years I've coded C# primarily, using ASP.NET for most sites. I did do *some* PHP but not much, and I spent a week reading a C book (K&R) but put it down. So when I decided to rewrite my node servers in C, it wasn't a small task.

I am doing okay, it's getting along, and I'm picking it up quit easily. Below is some C code that works on linux (I'm running CentOS and compiling with GNU-C99), which replicates the action of the lovely C# params keyword, allowing you to pass multiple parameters to a function. I will be using it to create a String.Replace replication. Note I'm not using C++ even though it has these ...I don't like the syntax changes, too many colons.

    #include <stdarg.h>
     
    void *passparams(int argc, char *args, ...)
    {
        va_list marker;
        va_start(marker, *args);
     
        for(int i = 0; i < argc; i++)
        {
            printf("arg: %s\n", args);
            args = va_arg(marker, char *);
        }
     
        va_end(marker);
    }

I won't explain it more than to say make sure you have some sort of terminator character when using va_list/va_arg, as you get segfaults otherwise. Some people have int lists like { 1, 2, 3, 4, -1 } but it's ugly, I prefer an argument count list.

Enjoy