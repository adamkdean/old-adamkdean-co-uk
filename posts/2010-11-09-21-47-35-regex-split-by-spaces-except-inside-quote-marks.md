---

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