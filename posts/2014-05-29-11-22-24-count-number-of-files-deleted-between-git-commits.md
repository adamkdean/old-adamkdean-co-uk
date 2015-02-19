---title: Count number of files deleted between Git commitsslug: count-number-of-files-deleted-between-git-commitsdate: 2014-05-29 11:22tags:  - git-log - bash - git---To count the number of files deleted between two Git commits, use the following command:

    $ git log --diff-filter=D --summary 45b0487..HEAD | grep 'delete mode' | wc -l

Be sure to change `45b0487` to the commit you want to count from, or remove `45b0487..HEAD` altogether to look through the entire history.

We use `grep` to count the number of deleted files.

    $ git log --diff-filter=D --summary | grep 'delete mode'

    delete mode 100644 test (3).txt
    delete mode 100644 test (4).txt
    delete mode 100644 test (2).txt

Then we use `wc -l` to do a line count:

    $ git log --diff-filter=D --summary | grep 'delete mode' | wc -l
          3

Sometimes you get whitespace back from `wc -l`, you can trim that with `tr`:

    $ git log --diff-filter=D --summary | grep 'delete mode' | wc -l | tr -d ' '

    3

This may take some time for larger repositories.