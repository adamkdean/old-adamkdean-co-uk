---
title: How to replace master branch in git, entirely, from another branch?
slug: how-to-replace-master-branch-in-git-entirely-from-another-branch
date: 2014-10-06 10:00
tags:
 - git
---
If you want to completely replace a branch by merging over another, the follow trick will help you, as it has helped me:

    git checkout yourbranch  
    git merge -s ours master  
    git checkout master  
    git merge yourbranch  
