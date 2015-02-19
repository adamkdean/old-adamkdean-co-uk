---title: Change filename case in gitslug: change-filename-case-in-gitdate: 2014-01-20 13:55tags:  - git---Git is case-insensitive. So to change filename case in git, you have to jump through a (small) hoop.

    git -f <source> <destination>

Example:

    git -f src/helloworld.js src/HelloWorld.js

And that's it!