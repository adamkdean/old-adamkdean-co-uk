---title: Changing text selection coloursslug: changing-text-selection-coloursdate: 2014-03-04 08:53tags:  - css---A nice little trick to add a bit of polish to your site is changing the colour of text selection. [Stockapps Blog](http://blog.stockapps.net/) have a nice orange colour, and of course, [Si Digital](http://sidigital.co/) have their well known Fuchsia highlighting.

You can easily implement this using the pseudo-element `::selection`.

    ::selection {
        color: white;
        background: red;
    }

Unfortunately, Gecko requires prefixing, so you also have to add in `::moz-selection`:

    ::moz-selection {
        color: white;
        background: red;
    }
    ::selection {
        color: white;
        background: red;
    }

It is worth noting that this is experimental, having been dropped from the specification, so I guess you shouldn't rely on this for anything "important" just yet. Hopefully it will stick around!