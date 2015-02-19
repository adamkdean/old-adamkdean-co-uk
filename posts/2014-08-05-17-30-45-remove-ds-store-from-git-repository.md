---title: Remove .DS_Store from git repositoryslug: remove-ds-store-from-git-repositorydate: 2014-08-05 17:30tags:  - git - osx - ds-store---The following will help you remove .DS_Store from your git repository.

    $ find . -name .DS_Store -print0 | xargs -0 git rm --ignore-unmatch
    $ echo ".DS_Store" >> .gitignore
    $ git add .gitignore
    $ git commit -m ".DS_Store removed from repository"

Now you can relax.