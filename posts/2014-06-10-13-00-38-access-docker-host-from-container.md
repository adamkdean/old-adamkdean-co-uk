---

For a small R&D project I just worked on, I had a 'gateway' container which would receive HTTP traffic and route it to other containers. For this it needed to have access to docker on the host so that it could index the containers and access their configurations, such as local IP addresses.

The way I got this to work was to install docker on the container, let's say this is the `ubuntu-docker` Dockerfile:

    FROM ubuntu

    # Install Docker
    RUN apt-get install docker.io -y
    RUN ln -sf /usr/bin/docker.io /usr/local/bin/docker

    CMD /bin/bash

Once that's built, I mount `docker.sock` to the container when running it like so:

    docker run -d -v /var/run/docker.sock:/var/run/docker.sock ubuntu-docker

Now if you were to run docker commands on the container, you'd actually be running them on the host. Bearing in mind that this is not a complete how to, I may write a full walkthrough if anyone needs it.