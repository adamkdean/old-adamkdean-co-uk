---title: Replace anchor tags with square bracket formatslug: replace-anchor-tags-with-square-bracket-formatdate: 2013-12-18 13:02tags:  - regex - c---For reason I won't go into, I have just found myself needing to replace a *lot* of anchor tags with square bracket format anchor tags, like so:

    // from
    <a href="#">link</a>
    
    // to
    [a href="#"]link[/a]

Obviously, we need to use RegEx here, and for future reference mainly for myself, here are the matching and replacing patterns:

    // match
    <a .*?href=['""](.+?)['""].*?>(.+?)</a>

    // replace
    [a href="$1"]$2[/a]

May as well put in the reverse as well:

    // match
    \[a .*?href=['""](.+?)['""].*?\](.+?)\[/a\]

    // replace
    <a href="$1">$2</a>

And then if you're doing this in C#, just use this method:

    string Regex.Replace(string input, string match, string replace)

There we go, saved myself about a year of tedious work!