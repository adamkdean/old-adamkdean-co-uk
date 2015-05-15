---
title: Installing Node.js on a Raspberry Pi
slug: installing-nodejs-on-a-raspberry-pi
date: 2015-05-15 21:37
tags:
 - raspberrypi
 - javascript
 - node.js
---

Raspbian is based on of Debian Wheezy, so things are a little different than the standard Ubuntu 14.04 installs. Remember to always read a script before you curl it to bash.

    curl -sLS https://apt.adafruit.com/add | sudo bash
    sudo apt-get install node

Now check it's running okay...
    
    pi@raspberrypi ~ $ node -v
    v0.12.0
    
Ok so it's a little behind but still on 0.12.X.
