---
title: Determine volume location on Docker host
slug: determine-volume-location-on-docker-host
date: 2015-11-03 08:50
tags:
 - docker
 - jenkins
---

Yesterday I was having an issue that I've had before. It stumped me last time and it stumped me again. I just didn't *think* and it cost me too much time.

The problem I was having, a problem I'd had before, is that I run Jenkins in a container with the Docker host socket passed through, so when Jenkins creates containers, they actually run on the host alongside it. This is great, but when you need to directly map files from the workspace to the container, things don't act the way you may expect. 

This is because the host is running the docker commands, Jenkins simply talks to the host via the socket. So those files that are in `/jenkins/jobs/yourjob/workspace/...` won't be in that location on the host.

The way I run Jenkins is that I have a data volume container called `jenkins_data` which as you've guessed, holds the data. In order to use a `-v src:dest` volume map, I'm going to need to locate these files on the host. Docker inspect helps here.

    docker inspect --format '{{ range .Mounts }}{{ if eq .Destination "/jenkins" }}{{ .Source }}{{ end }}{{ end }}' jenkins
    
Once I have the location, I need to do a search and replace on the `$WORKSPACE` variables which Jenkins exposes. After that, I have the location of the `/jenkins` volume on the host.

    JENKINS_ROOT=$(docker inspect --format '{{ range .Mounts }}{{ if eq .Destination "/jenkins" }}{{ .Source }}{{ end }}{{ end }}' jenkins)
    JENKINS_PATH=$(echo $WORKSPACE | sed "s|^\/jenkins|$JENKINS_ROOT|g")

Now I have `$JENKINS_PATH` I can directly map files or directories in from within my container.

    docker run d \
        -v $JENKINS_PATH/some/file.js:/var/lib/app/file.js \
        -v $JENKINS_PATH/dir:/var/lib/app/dir \
        someapp
