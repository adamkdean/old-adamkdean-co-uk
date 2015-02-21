---title: FizzBuzz? More than one line doesn't count!slug: fizzbuzz-more-than-one-line-doesn-t-countdate: 2013-03-21 11:54tags: - fizzbuzz - csharp---Just doing *research* over at [r/cscareerquestions](http://www.reddit.com/r/cscareerquestions/) when I stumbled upon [a thread about FizzBuzz](http://www.reddit.com/r/cscareerquestions/comments/1ap4ev/do_people_really_fail_fizzbuzz_during_interviews/).

I've heard of it, but I've never actually done it. I decided to do it and put myself to the test.

Basically the rule is:

> Write a program that prints the numbers from 1 to 100. But for multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz".

Seems simple enough:

    static void EasyFizzBuzz()
    {
        for (int i = 1; i <= 100; i++)
        {
            if (i % 3 == 0 && i % 5 == 0) Debug.WriteLine("FizzBuzz");
            else if (i % 3 == 0) Debug.WriteLine("Fizz");
            else if (i % 5 == 0) Debug.WriteLine("Buzz");
            else Debug.WriteLine(i);
        }
    }

But that's too easy. I'm sure everyone comes up with *that* solution. I'd rather stand out if I ever get asked, and nothing stands out more than a giant line of ternary operators. (Does it count as one line if I've put it onto the next line for appearance sake? Only has one semi-colon!)

    static void OneLineFizzBuzz()
    {
        for (int i = 1; i <= 100; i++) Debug.WriteLine((i % 3 == 0 && i % 5 == 0) ?
            "FizzBuzz" : (i % 3 == 0) ? "Fizz" : (i % 5 == 0) ? "Buzz" : i.ToString());
    }

Maybe I can come up with something more inventitive yet, just how creative can you be with such a simple problem?
