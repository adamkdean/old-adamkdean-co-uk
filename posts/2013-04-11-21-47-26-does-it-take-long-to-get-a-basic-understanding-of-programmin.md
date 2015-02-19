---title: Does it take long to get a basic understanding of programming?slug: does-it-take-long-to-get-a-basic-understanding-of-programmindate: 2013-04-11 21:47tags:  - programming---Reddit user [HONEY_THIGHS](http://www.reddit.com/user/HONEY_THIGHS) asked a very [good question today](http://www.reddit.com/r/learnprogramming/comments/1c4jx6/as_someone_interested_in_programming_but_with/), and I'd like to answer it a little more practically.

> Does it take long to get a basic understanding of programming?

A programming language is basically just a set of rules. You write some "code" to adhere to these rules, and either a [compiler](http://en.wikipedia.org/wiki/Compiler) or an [interpreter](http://en.wikipedia.org/wiki/Interpreter_(computing)) will read your code and apply these rules to get an outcome. There are lots of different programming languages, each designed for a different purpose, but fundamentally they all work the same way.

So let's do a bit of programming. We're going to make up a language called Honey. Honey will be a very simple language. We're going to run it in our heads and use our brains as the processors.

There are some things that Honey is going to need. 

First, it's going to need to be able to print an output to the user. For that we're going to make something called `print`. `print` is going to tell the computer (our brains in this case) to print something to an output, which in this case, is also our brain. Let's take a look at your first ever line of code:

    print "Hello world"

That is programming at it's most basic. We first have our `print` instruction, and after it we have our message `"Hello World"`. This simply tells the computer to print Hello world to the user. Simple, but not very useful.

You may have noticed that our message is surrounded by double quotes. In the programming world, we often group a bunch of text together with double quotes. It's an easy way of saying *my sentence starts here, and ends there*. A bunch of text is called a `string`. Think of it as a string of letters that make up a word. Quite literally letters on a string:

    ----H-e-l-l-o-----w-o-r-l-d----

Okay, so now Honey is able to output a message, but what use is that? We need to do something more useful. In order to do that, we're going to need something things called variables. Variables are basically names we give to values (strings, numbers etc) so that we can find them again later on.

You may have done algebra in school. If so, you might remember simple problems such as `x + 1 = 2, what is x?`. Well, `x` would be holding the value of `1` because 1 + 1 is 2. Variables work much like this. 

Take for example this little bit of code, can you guess what it does?

    message = "Hello world"
    print message
    
> The above code would output: `Hello world`

First, we assign some text to a *variable* named message. Then we print message. What our code is doing is taking our *string*, that's text remember, and storing it somewhere with the name `message`. Then, when we try and print our `message`, we can find our original string because we have the name it was stored under.

How about this one?

    name = "Adam"
    print name

> The above code would output: `Adam`.

Notice how we've changed the name of the variable, but it still works the same? You can call your variables whatever you like, as long as they don't break the rules of the programming language. In our language Honey, we're going to allow you to use the letters of the alphabet only.

We can also store numbers in variables. When storing numbers, you don't use double quotes. Double quotes tell the computer that you're storing a string, and numbers are just that: numbers. Let's try another snippet of code:

    age = 23
    print "Your age is "
    print age

>  The above code would output: `Your age is 23`

Notice how we've used two `print` instructions; one for a string and one for the age. We could easily put these together. Let's add them together and see what comes out:

    age = 23
    print "Your age is " + age

> The above code would output: `Your age is 23`

So as you see, we've added the number onto the end of the text, and it's printed the full message. Usually with programming languages, when you add a number to text, it makes the number part of the text. But what happens if you add two numbers? Let's try it.

    a = 7
    b = 5
    print a + b

> The above code would output: `12`

Aha! When you add numbers together, they stay as numbers. So `a` was added to `b` and the result, `12`, was printed. Amazing. Our programming language is now slightly more useful, but still not finished. We need one more component before we're ready for business. 

We need to be able to take data off of the user. We'll call this instruction `input`. It'll work like this:

    print "What is your name?"
    name = input
    print "Your name is " + name

> Input: `adam`  
> Output: `Your name is adam`

By asking a variable called `name` to store our instruction `input`, we will make the computer ask the user for some data. Think of it like an ATM machine asking you for your PIN:

    print "Enter PIN:"
    pin = input

This is, of course, a very simplified way of how that would work, but it makes sense. We are now able to write a little program that could be considered useful. 

One little thing we'll add before we make our program is something called comments. They're very important. Comments let you write messages to the programmer in the source code, but they are ignored by the compiler. Usually you will prefix your comment with a character or two, in our case we're going to use the '#' character.

    # This is a comment, and it's totally ignored by the computer
    print "Hello World!"

So, we have comments. Now let's write that program!

    # Language: Honey
	# Author: OP & reader
    # Description: USD to GBP conversion tool
    
    # $1.00 USD = £0.65 GBP
    # let's store the ratio for later
	ratio = 0.65

	# get the amount of dollars from the user	
	print "Enter USD $: "
    usd = input
	
	# now let's convert the dollars into her majesty's pounds	
	gbp = usd * ratio;

	# and now let's output the result
	print "$" + usd + " equals £" + gbp

Excellent. Now let's test it. Let's say we have 100 dollars and we want to convert that into pounds:

> Input: `100`  
> Output: `$100 equals £65`

Let's try a more complicated number:

> Input: `770.05`  
> Output: `$770.05 equals £500`

And there you have it. That's a basic understanding of programming.

I hope this has helped you understand the wonderful and confusing world of programming a little better. If you have any questions, please feel free to leave a comment or get in touch with me.

<sub>Further reading:  
[Computer_programming at Wikipedia](http://en.wikipedia.org/wiki/Computer_programming)  
[Python programming language at Wikipedia](http://en.wikipedia.org/wiki/Python_(programming_language))  
[Non-Programmer's Tutorial for Python 2.6 at Wikibooks](http://en.wikibooks.org/wiki/Non-Programmer's_Tutorial_for_Python_2.6)</sub>