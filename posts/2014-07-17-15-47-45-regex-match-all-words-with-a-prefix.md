---title: RegEx match all words with a prefixslug: regex-match-all-words-with-a-prefixdate: 2014-07-17 15:47tags:  - javascript - regex---Here is a snippet to match all words that begin with a specified prefix.

    /\bprefix\S+/g

JavaScript implementation:

    "test tbl_test1 tbl_test2 test".match(/\btbl_\S+/g)

Or

    /\btbl_\S+/g.exec("test tbl_test1 tbl_test2 test")

Which is the same as:

    var regex = /\btbl_\S+/g;
        matches = [],
        match;

    while (match = regex.exec(line)) {
        matches.push(match[0]);
    }

If you want a dynamic prefix, use RegExp:

    var regex = new RegExp('\\b' + prefix + '\\S+', 'g'),
        matches = [],
        match;

    while (match = regex.exec(line)) {
        matches.push(match[0]);
    }