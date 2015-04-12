---
title: Discovering service discovery services
slug: discovering-service-discovery-services
date: 2015-04-12 12:50
tags:
 - docker
 - consul
 - ubuntu
 - linux
 - networking
---

The problem with service discovery, is that in order to use it to discover services, services must first discover the service discovery service.

Docker assigns IP addresses to containers dynamically, so you cannot guaranteee on knowing where exactly a service will be. You don't want to passing the docker socket through to containers either, because that is a *Bad Thing*.

![1](https://i.imgur.com/z0XLS6Q.png)

So the question is, where do you start? You have to start somewhere, you have to have some sort of anchor point that you can gather the rest of your information from. I'm using Consul for my service discovery, and running it inside a container, so this is where I want to start. I want services to be able to talk to Consul and discover other services, but the start point has to be Consul. 

I thought about some sort of DNS so I can resolve `consul.local`, but the problem only shifts to the DNS server. I thought of a docker lookup service, where I can ask for a name and it gives me the containers `172.17.0.???` IP, but again, that simply shunts the responsibility over to the docker lookup application which is another moving part that can break.

## Solution

The solution was to create a separate virtual network interface which only the Consul services would use. I could then statically assign an IP to the nodes when they start and those IPs would be accessible by any service on the network.

![2](https://i.imgur.com/HIjUVQw.png)

To test this, I created the interface (see below for a permanent solution):

    sudo ifconfig eth0:1 10.0.0.1 netmask 255.255.255.0 up

Then I ran a `hello-world` app bound to that IP:

    docker run --rm -t -i -p 10.0.0.1:80:80 tutum/hello-world
    
I then navigated to `http://10.0.0.1/` and saw the hello world page. This is good, it means `eth0:1` works. I wasn't able to create a `docker0:1` interface without issues. As of yet I'm not sure why.

The next step is to launch Consul bound to that IP and then have other services connect to Consul now that the IP is known. For Node.js, I'm using [node-consul](https://www.npmjs.com/package/consul). Once it knows the Consul server location, it should be able to pull all the relevant services.

To start Consul:

    # This is only an example snipped from a larger file
    
    readonly NAME="consul-node1"
    readonly HOSTNAME="node1"
    readonly NETADDR="10.0.0.1"

    docker run -d -h $HOSTNAME \
        --name $NAME \
        -p $NETADDR:8400:8400 \
        -p $NETADDR:8500:8500 \
        -p $NETADDR:8600:53/udp \
        progrium/consul -server -bootstrap -ui-dir /ui

Now you can connect to 10.0.0.1 knowing that Consul is there.

## A more permanent network interface

For a more permanent network interface, edit `/etc/network/interfaces` and drop in the following at the bottom:

    # Private network for Consul services
    auto eth0:1
    iface eth0:1 inet static
        address 10.0.0.1
        netmask 255.255.255.0
        gateway 10.0.0.1
        
Then bring up the interface:

    $ sudo ifup eth0:1
    
Always check that the interface came up ok, as ifconfig/ifup/ifdown are very strange beings who do what they want, when they want, usually in a way you don't want.
    
# Disclaimer

This is less of a structured post and more of a notes-as-I-go format post. Please don't follow these instructions like they will build you a system. They will not. But what they might do is give you an idea as to how you can work certain things. Most of all, they will serve as a great resource for future me.
