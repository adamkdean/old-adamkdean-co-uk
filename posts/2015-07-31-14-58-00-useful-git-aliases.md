---
title: Useful git aliases
slug: useful-git-aliases
date: 2015-07-31 14:58
tags:
 - git
---

I've been so busy recently that this blog has been neglected. I'm planning on fixing some design quirks and adding in some archiving, maybe even giving it a biy of a face lift so it's not so drab. Something I don't want to happen is to have empty months when it comes to my archive so today is the last day of July and I'll show you what aliases I have in my git config.

    [alias]
        a = "!git add -A . && git add -u"
        ab = branch -avv
        dt = difftool
        s = status
        b = branch -a
        k = !gitk --all --select-commit=HEAD &
        r = remote -v
        rh = reset --hard
        pr = "!git add . && git add -u && git stash && git pull && git stash pop"
        logp = log -n10 --decorate --graph --pretty=tformat:\"%C(yellow)%h%Creset%C(cyan)%d%C(reset) %s %C(green)(%an, %ar)%C(reset)\" --relative-date
        diffp = diff --ignore-space-at-eol -b -w   
        llm = log -1
        unadd = reset --
        ua = reset --
        h = rev-list --max-count=1 HEAD
        list-merge-backups = !git status -su | grep -e'\\.orig$' | cut -f2 -d' '
        delete-merge-backups = !git list-merge-backups | xargs rm
        mergefrom = merge -s recursive -X theirs
    
Well, that was an easy blog post, but I can't use git without these, they save a lot of time!
