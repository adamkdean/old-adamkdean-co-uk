---
title: Access boot2docker container IP
slug: access-boot2docker-container-ip
date: 2015-05-10 20:26
tags:
 - docker
 - osx
 - boot2docker
---

When you run boot2docker, all your containers will be running on that VM, not on your local machine. Therefore, you won't be able to access them via their container IPs by default.

To access them, ensure that boot2docker is running, and run:

    $ sudo route -n add 172.17.0.0/16 `boot2docker ip`
    
This tells your machine to direct all traffic on the docker IP subnet to the IP address that your boot2docker is running on.
