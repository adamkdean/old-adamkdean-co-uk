---

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