---
title: Install Consul on Ubuntu 14.04
slug: install-consul-on-ubuntu-14-04
date: 2015-04-05 9:19
tags:
 - consul
 - ubuntu
---

To install Consul on Ubuntu 14.04, first make sure you have unzip available:

    $ apt-get install -y unzip
    
Now, grab the Consul archive, [make sure to get the latest & the right architecture](https://dl.bintray.com/mitchellh/consul/), at the time of writing it is 0.5.0, and for Ubuntu it's linux_amd64:

    $ wget https://dl.bintray.com/mitchellh/consul/0.5.0_linux_amd64.zip
    
Now unzip it.

    $ unzip 0.5.0_linux_amd.zip
    
Now move `consul` to somewhere in your PATH:

    $ mv consul /usr/bin/local/consul
    
Finally, check it works:

    $ consul --version
    
    Consul v0.5.0
    Consul Protocol: 2 (Understands back to: 1)
    
Good job!
