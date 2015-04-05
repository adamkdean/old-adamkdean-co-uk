---
title: Get container ID from within container
slug: get-container-id-from-within-container
date: 2015-04-05 12:11
tags:
 - docker
 - shell
 - linux
---

To get the container ID from within a container, use this:

    $ cat /proc/self/cgroup | grep "docker" | sed s/\\//\\n/g | tail -1
    
I'll probably stick it in an npm module at some point.
