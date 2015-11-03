---
title: Speed up OS X terminal startup
slug: speed-up-osx-terminal-startup
date: 2015-11-03 11:31
tags:
 - osx
---

Following on from my [tweet](https://twitter.com/imdsm/status/659664112180461568) the other day, I thought I'd publish this 'trick' here.

I have found my terminal gets really slow after about six months of use, and the trick to clear it up is to remove a shedload of log files which OS X seems to hoard. Now, if you're particular precious about your terminal history then don't do this, but if you'd prefer not to wait a second for your terminal to log in, then you can clean up the logs like so:

    sudo rm -rf /private/var/log/asl/*.asl
    
Disclaimer: using `sudo rm -rf` without understanding what you're doing can be dangerous. If you don't understand it, don't mess with it. If you do, it's not my fault you broke your machine. Please [read more about rm](http://man7.org/linux/man-pages/man1/rm.1.html) first.
