---
title: Change keyboard layout on Ubuntu + Xrdp
slug: change-keyboard-layout-on-ubuntu-xrdp
date: 2015-11-30 09:45
tags: 
 - ubuntu
 - xrdp
---

If you're using Ubuntu with Xrdp, and you find the keyboard to be infuriatingly inaccurate, you should probably change it. To do this, you need to have the ability to open the `System Settings` window, which you can't always do over RDP. In there, go to `Text Entry`, and click the little plus at the bottom. Now select the keyboard layout that applies to you, and test it works.

Now, finally, to make these settings apply to Xrdp, run the following command:

    $ sudo xrdp-genkeymap /etc/xrdp/km-0409.ini
    
Logout, log back in with Xrdp and it should now work.
