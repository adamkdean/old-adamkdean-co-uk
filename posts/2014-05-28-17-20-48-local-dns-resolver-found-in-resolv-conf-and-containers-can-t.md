---title: Local DNS resolver found in resolv.conf and containers can't use itslug: local-dns-resolver-found-in-resolv-conf-and-containers-can-tdate: 2014-05-28 17:20tags:  - ubuntu - dhcp - dnsmasq - docker---I've been playing with Docker for part of a project, and came across this annoying but important message:

> WARNING: Local (127.0.0.1) DNS resolver found in resolv.conf and containers can't use it. Using default external servers : [8.8.8.8 8.8.4.4]

The problem? `/etc/resolv.conf` has `nameserver 127.0.0.1` (or `nameserver 127.0.1.1`) in it.

I worked out that Ubuntu 14.04 LTS uses a daemon called `dnsmasq`, which routes DNS traffic through to the DNS servers provided by DHCP.

While this works fine for Docker, that message is quite annoying.

I disabled dnsmasq in `/etc/NetworkManager/NetworkManager.conf`:

    $ sudo nano /etc/NetworkManager/NetworkManager.conf
    
    #dns=dnsmasq

I then added the public Google DNS servers to `/etc/dhcp/dhclient.conf`:

    $ sudo nano /etc/dhcp/dhclient.conf

    prepend domain-name-servers 8.8.8.8,8.8.4.4;

Then you just need to restart NetworkManager: 

    $ sudo restart network-manager

And now you can start Docker containers without that pesky message!