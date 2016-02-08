---
title: List all files changed in last commit
slug: list-all-files-changed-in-last-commit
date: 2016-02-08 10:51
tags: 
 - git
 - snippet
---

List all files changed in the last commit by using `git diff-tree` on HEAD.

    git diff-tree --no-commit-id --name-only -r HEAD
    
For example, if you changed README.md in your last commit:

    adam@macbook:project (master) $ git diff-tree --no-commit-id --name-only -r HEAD
    README.md
