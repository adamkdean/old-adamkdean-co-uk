---title: Regex split by spaces except inside quote marksslug: regex-split-by-spaces-except-inside-quote-marksdate: 2010-11-09 21:47tags:  - regex - c---Here's a nifty little bit of code I just wrote while writing a console input handler. Sometimes you will want to split up a string by a space, but then how do you input more than one word as a single argument? You put it in quote marks, but then how do you split those separately? Like this:

    MatchCollection matches = Regex.Matches(p, "[^\\s\"']+|\"[^\"]*\"|'[^']*'");

Yep, one line of code. Don't forget to include System.Text.RegularExpressions though!

Lets take it further for a little test (actually the test code I was using):

    MatchCollection matches = Regex.Matches(p, "[^\\s\"']+|\"[^\"]*\"|'[^']*'");
    WriteToConsole("Match Count: {0}", matches.Count);

    foreach (Match match in matches) WriteToConsole(match.ToString());

Input:

`The "quick brown fox" jumps over "the lazy dog"`

Output:

`Match Count: 5  
 The  
 "quick brown fox"  
 jumps  
 over  
 "the lazy dog"`

So there you have it, probably the easiest way to do it.

Enjoy