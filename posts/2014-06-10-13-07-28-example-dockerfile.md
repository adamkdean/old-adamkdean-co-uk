---title: Example Dockerfileslug: example-dockerfiledate: 2014-06-10 13:07tags:  - docker - dockerfile - nginx---Here is an example Dockerfile. It installs nginx and adds /src to the wwwroot. Make sure that the files are 755.

    # DOCKER-VERSION 0.9.1

    FROM ubuntu
    MAINTAINER Adam K Dean

    RUN apt-get update
    RUN apt-get -y install nginx

    RUN echo "daemon off;" >> /etc/nginx/nginx.conf
    ADD default /etc/nginx/sites-available/default
    ADD /src /var/www

    EXPOSE 80

    CMD ["nginx"]

`FROM` defines the base image.

`RUN` runs a command, use it to install software for example.

`ADD` adds local files to the container.

`EXPOSE` exposes a port so that the host can map a port to tunnel to it.

`CMD` defines the command that will be run when the container starts. There can only be one command, if there are multiple, the last one will be used. You can pass parameters to it like so: 

    CMD ["service", "parameter"]

