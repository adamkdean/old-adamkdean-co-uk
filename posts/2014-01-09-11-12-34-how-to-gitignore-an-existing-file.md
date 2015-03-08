---

First, add the path to your `.gitignore` file:

    src/path/to/file/style.css

Then, in git bash, we want to clear the cache, so run these commands:

    git rm -r --cached .
    git add .
    git commit -m ".gitignore is now working"

Now push your changes and be free of these bothersome files!

More info: http://stackoverflow.com/questions/11451535/gitignore-not-working