---title: Install Docker on Ubuntuslug: install-docker-on-ubuntudate: 2014-05-28 15:55tags:  - linux - docker - ubuntu---To install Docker on Ubuntu 14.04 LTS, run the following commands:

    $ sudo apt-get install docker.io
    $ sudo ln -sf /usr/bin/docker.io /usr/local/bin/docker

Once that is done, add your user to the docker group:

    $ sudo usermod -a -G docker adam

After this, you may need to logout and login again. I had an issue where I recieved an error like this:

    $ docker ps
    dial unix /var/run/docker.sock permission denied

Once you've logged out and back in again, you can test docker is installed and works like so;

    $ docker version
    Client version: 0.9.1
    Go version (client): go1.2.1
    Git commit (client): 3600720
    Server version: 0.9.1
    Git commit (server): 3600720
    Go version (server): go1.2.1
    Last stable version: 0.11.1

Be sure to read up more at [Getting Started](https://www.docker.io/gettingstarted/)