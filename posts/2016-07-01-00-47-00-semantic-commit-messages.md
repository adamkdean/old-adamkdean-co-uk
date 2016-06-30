---
title: Semantic commit messages
slug: semantic-commit-messages
date: 2016-07-01 00:47
tags: 
 - git
---

I have decided to adopt the following rules for [semantic commit messages](https://seesparkbox.com/foundry/semantic_commit_messages).

    feat: add hat wobble  
    ^--^  ^------------^  
    |     |  
    |     +-> Summary in present tense.  
    |  
    +-------> Type: chore, docs, feat, fix, refactor, style, or test.

Although I sometimes only see chore, docs, feat, and fix, I do think refactor, style and test are useful too.

More examples on behalf of [mutewinter](https://github.com/mutewinter):

    chore: add Oyster build script  
    docs: explain hat wobble  
    feat: add beta sequence  
    fix: remove broken confirmation message  
    refactor: share logic between 4d3d3d3 and flarhgunnstow  
    style: convert tabs to spaces  
    test: ensure Tayne retains clothing

Code should be self-documenting, but commit messages should allow a developer to completely understand what that patch does. The developer should be able to implement the changes again without looking at the code, just from the commit message. `fixed pesky bug` doesn't quite cut it.
