---title: Remove branch from remote git reposlug: remove-branch-from-remote-git-repodate: 2014-08-04 12:35tags:  - git---To remove a branch from a remote git repository, you have to push an empty branch.

    $ git push origin :branch-name
    - [deleted]        branch-name

If you want to also remove it from the local repo, delete the branch:

    $ git checkout master 
    Switch to branch 'master'

    $ git branch -D branch-name
    Deleted branch branch-name (was abcd123)

We change branch as you can't delete the branch you're on.