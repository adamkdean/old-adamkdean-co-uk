---

    $ find . -name .DS_Store -print0 | xargs -0 git rm --ignore-unmatch
    $ echo ".DS_Store" >> .gitignore
    $ git add .gitignore
    $ git commit -m ".DS_Store removed from repository"

Now you can relax.