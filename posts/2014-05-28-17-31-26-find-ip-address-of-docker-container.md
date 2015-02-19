---title: Find IP address of Docker containerslug: find-ip-address-of-docker-containerdate: 2014-05-28 17:31tags:  - docker---To get the IP address of a Docker container, use the following command:

    $ docker inspect --format '{{ .NetworkSettings.IPAddress }}' ${CID}

So let's say the ID of the container is `a2150s`, we could get the IP like so:

    $ docker inspect --format '{{ .NetworkSettings.IPAddress }}' a2150s

    172.17.0.2

I have written a script for this, `/usr/local/bin/dockerip`:

    #!/bin/bash
    
    COUNT=`docker ps | grep $1 | wc -l | bc`
    
    if [ $COUNT -gt 0 ]; then
      IP_ADDRESS=`docker inspect --format '{{ .NetworkSettings.IPAddress }}' $1`
      echo "$1: $IP_ADDRESS"
    else
      echo "Could not find $1. Check container is running."
    fi

This will form part of a [repository of useful docker scripts](https://github.com/Imdsm/docker-scripts).