---title: Adding Windows back to grubslug: adding-windows-back-to-grubdate: 2014-06-01 10:28tags:  - ubuntu - grub - linux - windows---After my previous post, I sit here with a working grub installation, but it doesn't yet allow me to boot into Windows.

This is really easy.

    $ sudo update-grub
    [sudo] password for adam: 
    Generating grub.cfg ...
    Found linux image: /boot/vmlinuz-3.11.0-22-generic
    Found initrd image: /boot/initrd.img-3.11.0-22-generic
    Found linux image: /boot/vmlinuz-3.11.0-12-generic
    Found initrd image: /boot/initrd.img-3.11.0-12-generic
    Found memtest86+ image: /boot/memtest86+.bin
    Found Windows 7 (loader) on /dev/sda1
    done

Done.
