---title: Remove all tags from git reposlug: remove-all-tags-from-git-repodate: 2014-03-06 10:27tags:  - git---I had started to tag builds with a branch name and date, but after a while, these started to make the log unreadable. It was time to Arnold Schwarzenegger-ize them.

I found this somewhere online:

    for t in `git tag`
    do
        git push origin :$t
        git tag -d $t
    done

Saved it to `removetags.sh`, ran it, and now my life (and log) is much happier.