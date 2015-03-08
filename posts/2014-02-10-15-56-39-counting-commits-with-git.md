---

For the branch you're on, use:

    git rev-list --count HEAD
    5

Or for another `<branch>`, use:

    git rev-list --count <branch>
    5

Also, to count commits by author, you can use `git shortlog`:

    git shortlog -s -n
    4 Some User
    1 Joe Bloggs