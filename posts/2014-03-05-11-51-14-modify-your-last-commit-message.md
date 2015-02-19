---title: Modify your last commit messageslug: modify-your-last-commit-messagedate: 2014-03-05 11:51tags:  - snippet - git---It's easy to modify your last commit message, simply add `--amend` and commit again.

    git commit -m "Fixed issue where udpate failed"

Oh, not again, look at that typo!

    git commit --amend -m "Fixed issue where update failed"

As simple as that.