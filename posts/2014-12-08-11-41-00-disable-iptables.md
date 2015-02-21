---
title: Disable iptables
slug: disable-iptables
date: 2014-12-08 11:41
tags:
 - ubuntu
 - iptables
---
Rather than disabling iptables in Ubuntu 14.04, you can allow everything.

    iptables -F
    iptables -P INPUT ACCEPT
    iptables -P OUTPUT ACCEPT
    iptables -P FORWARD ACCEPT

It's bad, but it works.
