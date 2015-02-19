---title: Remove all Docker containersslug: remove-all-docker-containersdate: 2014-06-05 15:31tags:  - linux - docker---After working with Docker for only a few hours, I now have more old containers than I have fingers. 

A quick and easy way to remove these is to run:

    $ docker rm $(docker ps -q -a);

`-q` is quiet mode, which only returns container IDs. 

`-a` is all, which as it's name suggests, returns all containers.

This will try and remove any running containers too, but that will fail.