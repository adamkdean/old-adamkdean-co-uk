---title: Git workflow scriptsslug: git-workflow-scriptsdate: 2013-07-11 15:37tags:  - productivity - bash - git---The following are a couple of general purpose scripts which will help you to work quicker with Git. Put these in your bin folder, so either `/home/user/bin` or `C:\Users\Username\bin` depending on your OS. Remember if it's nix, `chmod +x` them.

`ga` - Git add script:

    #!/bin/sh
    git add -A

`gs` - Git status script:

    #!/bin/sh
    git status

`gpull` - Git pull script (origin master):

    #!/bin/sh
    git pull origin master

`gpush` - Git push script (origin master):

    #!/bin/sh
    git push origin master

`gc` - Git commit script:

    #!/bin/sh
    read -p "Commit msg: " desc
    git commit -m "$desc"

`gfull` - Git add, status, commit (with msg) and push (origin master) script.

    #!/bin/sh
    git add -A
    git status
    read -p "Commit msg: " desc
    git commit -m "$desc"
    git push origin master

I may post more if I come up with anything more intricate, but for now, these can save a lot of time.

If you have any scripts you use often, be sure to share them!