---

But after installing, grub decided to throw me a nasty message.

    Error: file '/grub/i386-pc/normal.mod' not found
    rescue>

I knew this had something to do with UEFI. I hate UEFI. SecureBoot is nothing but trouble. I tried many things but finally went to bed. Now, I'm writing this from a working installation. This is how I fixed it.

I booted into a Live environment, opened the terminal, and mounted the installation and chrooted into it. I had Windows siting on /dev/sda1 and /dev/sda2, and installed Ubuntu to an Ext4 partition which was /dev/sda3:

    $ sudo -s
    # mount /dev/sda3 /mnt
    # mount -t proc none /mnt/proc
    # mount -t sysfs none /mnt/sys
    # mount -o bind /dev /mnt/dev
    # mount -o bind /tmp/ /mnt/tmp
    # chroot /mnt

Next I removed the grub EFI packages:

    # apt-get remove --purge grub-efi-amd64 grub-efi-amd64-bin

Next I tried to re-install the grub pc packages, but had a strange error about resolving `gb.archive.ubuntu.com`. To fix this, I had to add some entries to the `/etc/hosts` file:

    91.189.91.15      archive.ubuntu.com
    91.189.92.200     gb.archive.ubuntu.com
    91.189.91.15      security.ubuntu.com
    91.189.92.152     extras.ubuntu.com

Now I reinstall grub pc packages:

    # apt-get --reinstall install grub-common grub-pc os-prober

When the screen pops up asking about where to install grub, I just selected /dev/sda. After that, reboot your machine and you might be in luck. If not, you could go and ask over at #ubuntu on freenode, though you probably won't get an answer.