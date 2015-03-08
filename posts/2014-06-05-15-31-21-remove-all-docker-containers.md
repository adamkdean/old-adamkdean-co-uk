---

A quick and easy way to remove these is to run:

    $ docker rm $(docker ps -q -a);

`-q` is quiet mode, which only returns container IDs. 

`-a` is all, which as it's name suggests, returns all containers.

This will try and remove any running containers too, but that will fail.