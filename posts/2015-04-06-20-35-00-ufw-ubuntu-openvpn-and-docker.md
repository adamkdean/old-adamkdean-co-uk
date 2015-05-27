---
title: UFW, Ubuntu, OpenVPN, and Docker
slug: ufw-ubuntu-openvpn-and-docker
date: 2015-04-06 20:35
tags:
 - docker
 - ubuntu
 - ufw
 - openvpn
 - iptables
 - linux
---

Today I've been playing with UFW, Ubuntu, OpenVPN, and Docker. A few other things as well but this post relates to those technologies, mainly UFW, Ubuntu, and Docker.

In case you didn't know, like I didn't know, when you expose ports, Docker thinks a great idea would be to put some rules into iptables to allow the traffic to pass through. I'm sure there is a good reason for this, but you may find that when you enable UFW, traffic still gets through. Now that I understand what is going on, it all makes sense, but getting to that point has taken up my evening.

I followed this tutorial on [how To Run OpenVPN in a Docker Container on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-run-openvpn-in-a-docker-container-on-ubuntu-14-04) which was a breeze. Really highlighted the strengths of Docker. This setup assigns you an IP from 192.168.255.0/24.

My next step, now that I had VPN access, was to shut down eth0 on the machine, allowing through only ports 22 & 1194/udp. What I didn't know was that Docker was going to be a royal pain in the arse during this time. It would continue to bypass my rules and make me wonder what the hell was wrong with UFW. Nothing was, it was Docker playing with iptables.

To stop Docker from doing this, you have to start the Docker daemon, or Docker engine I think it's now called, with the --iptables=false flag. To do this, on Ubuntu 14.04, open up `/etc/default/docker` in your favourite text editor and add the following line:

    DOCKER_OPTS="--iptables=false"
    
Save that, and then restart the Docker daemon/engine/server thing:

    sudo restart docker
    
Now, I'm not sure what happens here with existing containers, but I went ahead and deleted them and started fresh. Now when you start new containers, there won't be crazy rules bypassing UFW.

For UFW, I had to add a few rules. I added in ports 22 (SSH) and 1194/udp (VPN). I also added a rule to allow all traffic from docker0:

    sudo ufw allow 22
    sudo ufw allow 1194/udp
    sudo ufw allow in on docker0 to any
    sudo ufw enable
    
Next, I started some containers, and tried to access them. No access... turned on the VPN, tried again, and bingo. I had access. It took a while to get there but I got there. Secured access to my containers.

Now I need a long, hot bath to relax. Thanks a lot Docker!

