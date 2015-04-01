---
title: Rename Ubuntu droplet
slug: rename-ubuntu-droplet
date: 2015-04-01 12:06
tags:
 - digitalocean
 - droplet
 - ubuntu
---

To rename a Digital Ocean Ubuntu droplet, update `/etc/hostname` and `/etc/hosts`, then run:

    service restart hostname

You'll need either root access or sudo for this.
