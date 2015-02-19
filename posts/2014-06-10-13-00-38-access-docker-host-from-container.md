---title: Access Docker host from containerslug: access-docker-host-from-containerdate: 2014-06-10 13:00tags:  - docker - ubuntu---Docker 1.0 has just [been announced](http://blog.docker.com/2014/06/its-here-docker-1-0/), and one thing I was looking forward to was the introspection API which [Solomon Hykes said was coming in 1.0](https://github.com/dotcloud/docker/issues/1143#issuecomment-22354479). Unfortunately, it doesn't look like it has. This is a shame because it would allow the container to communicate with the host in a scoped and controlled manner.

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