---
title: Remove all exited containers
slug: remove-all-exited-containers
date: 2015-05-27 17:03
tags:
 - docker
 - linux
---

This removes all exited containers.

    docker ps -a | grep 'Exited' | awk '{print $1}' | xargs --no-run-if-empty docker rm
    
Use with care as it will also removed Data Volume Containers.
