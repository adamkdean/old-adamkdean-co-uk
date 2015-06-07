---
title: Copying files from one container to another
slug: copying-files-from-one-container-to-another
date: 2015-06-07 15:56
tags:
 - docker
 - linux
 - osx
---

This only works on OS X as I'm using `pbcopy` and `pbpaste`. You may replace these as you see fit. Also I'm using superdocker here, you can swap that for docker if you like, it makes no difference.

What I needed to do was copy some SSL certificates from one container to another. I wanted the easiest way of doing this for the future. Thus I came up with this somewhat messy solution. I like it though. In this case the source container is called 'registry' and the destination container is a data volume container called 'publisherd-data'.

    superdocker exec -ti $(superdocker ps | grep registry | awk '{print $1}') \
        cat /go/src/github.com/docker/distribution/certs/domain.crt | \
        pbcopy && \
        superdocker run --rm -ti \
            --volumes-from publisherd-data \
            ubuntu bash -c "echo '$(pbpaste)' > /etc/nginx/certs/registry.domain.com.crt"

    superdocker exec -ti $(superdocker ps | grep registry | awk '{print $1}') \
        cat /go/src/github.com/docker/distribution/certs/domain.key | \
        pbcopy && \
        superdocker run --rm -ti \
            --volumes-from publisherd-data \
            ubuntu bash -c "echo '$(pbpaste)' > /etc/nginx/certs/registry.domain.com.key"
            
To break it down, we first grab the certificate by running docker exec on the source container, which we find by doing a quick docker ps | grep | awk.

    superdocker exec -ti $(superdocker ps | grep registry | awk '{print $1}') \
        cat /go/src/github.com/docker/distribution/certs/domain.crt
        
Next we pipe that to pbcopy, the OS X clibpoard utility. 

    superdocker exec -ti $(superdocker ps | grep registry | awk '{print $1}') \
        cat /go/src/github.com/docker/distribution/certs/domain.crt | \
        pbcopy
        
Then we run an ethereal container which we connect to the destination data volume container. We then simply empty our clipboard into the destination file.

    superdocker exec -ti $(superdocker ps | grep registry | awk '{print $1}') \
        cat /go/src/github.com/docker/distribution/certs/domain.crt | \
        pbcopy && \
        superdocker run --rm -ti \
            --volumes-from publisherd-data \
            ubuntu bash -c "echo '$(pbpaste)' > /etc/nginx/certs/registry.domain.com.crt"
            
It's a figurative mouthful, but it does the trick without saving your certs anywhere. You might also want to clear that clipboard afterwards though.

    echo '' | pbcopy
