---
title: Share directories between two containers
slug: share-directories-between-two-containers
date: 2015-06-01 23:15
tags:
 - docker
 - linux
---

Create data volume container:

    docker run -d \
        -v /var/test/ \
        --name test-data \
        busybox

Start one container using it:

    docker run -d \
        --name test-1 \
        --volumes-from test-data \
        adamkdean/baseimage bash -c "while true; do echo 'ping'; sleep 5; done"

Start another using it:

    docker run -d \
        --name test-2 \
        --volumes-from test-data \
        adamkdean/baseimage bash -c "while true; do echo 'ping'; sleep 5; done"

Attach to the first:

    docker exec -ti test-1 bash
    root@7bfff33a2309:/# cd /var/test/
    root@7bfff33a2309:/var/test# ls
    
Attach to the second:

    docker exec -ti test-2 bash
    root@7bfff33a2309:/# cd /var/test/
    root@69e9a3cc34a2:/var/test# ls
    
Create a file in the first one:

    root@7bfff33a2309:/var/test# touch test-file
    
Check in the second one:

    root@69e9a3cc34a2:/var/test# ls
    test-file
    
Both `test-1` and `test-2` are sharing the data on the data volume container `test-data`.
