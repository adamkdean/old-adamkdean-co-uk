---title: boot2docker DNS not workingslug: boot2docker-dns-not-workingdate: 2014-08-04 16:26tags:  - docker - boot2docker - osx---If you're using Docker on OSX, then you'll be using a VM to run your Docker service on, as it needs Linux, not Unix. The most popular of these seems to be boot2docker, though dvm also seems to be quite popular. Other solutions are available.

I have a problem where sometimes boot2docker's DNS just doesn't seem to work.

I found some instructions on how to fix it though:

    $ boot2docker ssh
    $ sudo udhcpc
    udhcpc (v1.22.1) started
    Sending discover...
    Sending select for 10.0.2.15...
    Lease of 10.0.2.15 obtained, lease time 86400
    deleting routers
    route: SIOCDELRT: No such process
    adding dns 192.168.1.1    
    $ sudo /etc/init.d/docker restart
    $ exit

Now if you attempt to ping Google, it should work!