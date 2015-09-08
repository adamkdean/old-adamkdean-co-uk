---
title: Reclaim your inodes by deleting dangling docker volumes
slug: reclaim-your-inodes-by-deleting-dangling-docker-volumes
date: 2015-09-08 15:49
tags:
 - docker
 - linux
 - bash
---

Earlier today I had a strange issue where Docker builds started failing, citing there was no free space. When I looked, there was gigabytes of free space. I looked into this further and found that Jenkins liked to open a *lot* of files. 30,000 for a fresh install, in fact. I thought this was my problem but it wasn't. Something else was causing the system to run out of space.

I dug around a bit more and found that the problem was inodes, which are data structures used to represent filesystem objects such as files or directories. To be more precise, the problem was a distinct lack of available inodes. Of the 2.9 *million* available, 2.9 *million* were in use. That's 100%.

I had a funny feeling that dangling volumes had something to do with this, so I had a look at how many I had:

    $ docker images -qf 'dangling=true' | wc -l
    100

These were quite large images too, comprising of multiple files and directories. So many in fact that it was using up all the inodes available on the system. To repeat, that was 2.9M inodes.

I was able to clear it up by running `docker images -qf 'dangling=true' | xargs docker rmi`, which takes a while but cleared it up. In case this happens in the future, I've put some logging in place to keep an eye on the inode usage, and created a little script for people to use in case I'm not around and this happens again.

Here is `can-i-have-my-inodes-back-please.sh`:
    
    #!/bin/bash
    #
    # Are your inodes all tied up?
    # Would you like to make them liquid again?
    # Run this script for up to instant relief
    # (smallprint: maytakeuptotwentyminutesdependingonnumberofdanglingvolumes)
    
    DANGLING_NUM=$(docker images -qf 'dangling=true' | wc -l)
    
    read -p "Are you sure you want to remove $DANGLING_NUM dangling volumes? (Y/N) " prompt
    
    if [[ $prompt == "y" || $prompt == "Y" || $prompt == "yes" || $prompt == "Yes" ]]; then
      docker images -qf 'dangling=true' | xargs docker rmi
    else
      exit 0
    fi

And in case you're interested, the crontab runs this script hourly, `log-inode.sh`:

    #!/bin/bash
    INODE=$(df -i | sed -n 2p | awk '{ print $5 }')
    DATE=$(date +'%m/%d/%Y %H:%M')
    echo "$DATE,$INODE"
    
In a few weeks I'll grab that csv data and bung it into Excel and see just how bad this inode problem is. Maybe a nightly dangling volume cleanup will do the trick.
