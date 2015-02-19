---title: RDP via OpenSSHslug: rdp-via-opensshdate: 2014-06-27 11:15tags:  - ssh - rdp---I wrote about [connecting to RDP over SSH](http://adamkdean.co.uk/blog/read/105/rdp-via-ssh-putty), but that relied upon PuTTY. As I'm now using OSX, I have access to OpenSSH. This makes things easier.

    ssh -L <localport>:<remotehost>:<remoteport> <sshserver>

For example:

    ssh -L 8001:192.168.0.1:3389 adamkdean.co.uk

Now you can connect to local port 8001 with RDP.