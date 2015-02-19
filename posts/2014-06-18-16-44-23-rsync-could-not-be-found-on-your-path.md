---title: rsync could not be found on your PATHslug: rsync-could-not-be-found-on-your-pathdate: 2014-06-18 16:44tags:  - rsync - cygwin - mingw - vagrant - linux - bash - windows---If you're trying to use Vagrant with Windows, and you've opted to use MinGW rather than Cygwin, you might have come across this error message when spinning up Vagrant instances:

> rsync could not be found on your PATH. 
> Make sure that rsync is properly installed on your system and available on the PATH.

This is easy to fix, when you know how.

First, install Cygwin. If you pick the x64 version, it will install by default to `c:\cygwin64\`. When you're installing it, and you get to select the components you wish to install, search for `rsync`, go to `net`, and click the label that says `auto` until it gives you a version number, such as `3.0.0` etc. Then continue with the installation of Cygwin.

Next, once this is done, in order to use MinGW rather than switching to Cygwin, we need to add the bin directory to our PATH. Navigate to the Cygwin folder, and then to the bin folder. Verify the path. For me it is `c:\cygwin64\bin`.

1. Right-click on your "My Computer" icon and select "Properties".
2. Click on the "Advanced" tab, then on the "Environment Variables" button.
3. You should be presented with a dialog box with two text boxes. The top box shows your user settings. The bottom box shows your system settings. While you may be told not to touch your system settings, I'm going to recommend you do. I tried user settings and it didn't work. If you do this and you break it, I'm not to blame. There is my disclaimer. Don't be an idiot.
4. Click on the PATH entry in the BOTTOM box, then click on the "Edit" button
5. Scroll to the end of the string and at the end add the path to the bin folder you previously found. Be sure to add a semi-colon first. It could look like this:

`c:\windows;c:\windows\system32` and you change that to `c:\windows;c:\windows\system32;c:\cygwin64\bin` etc.

Now, if you go to your MinGW terminal, and `echo $PATH`, you should have the new path in there. If not, try restarting the MinGW terminal. You can properly test it works by typing `rsync --version`:

    $ rsync --version
    rsync  version 3.1.0  protocol version 31
    Copyright (C) 1996-2013 by Andrew Tridgell, Wayne Davison, and others.
    Web site: http://rsync.samba.org/
    Capabilities:
        64-bit files, 64-bit inums, 64-bit timestamps, 64-bit long ints,
        no socketpairs, hardlinks, symlinks, IPv6, batchfiles, inplace,
        append, ACLs, no xattrs, iconv, symtimes, prealloc
    
    rsync comes with ABSOLUTELY NO WARRANTY.  This is free software, and you
    are welcome to redistribute it under certain conditions.  See the GNU
    General Public Licence for details.

Now try `vagrant up` again. Job done?