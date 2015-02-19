---title: Install Emmet (Zen Coding) in Sublime Textslug: install-emmet-zen-coding-in-sublime-textdate: 2013-09-11 21:30tags:  - sublimetext - emmet - zen-coding---For those who don't know, Zen Coding -- or [Emmet](http://docs.emmet.io/) as it's now known -- is a set of plugins for text editors that allow for high-speed coding and editing in HTML, XML, XSL, and other structured code formats via content assist. (Thanks Wikipedia!)

If you don't already use this, you should, and I'm going to show you (or future me) how to install it for Sublime Text. Note that 'merican users will have to use a different key binding, so if a menu doesn't pop up, try some other key combinations.

The first thing you want to do is open up Sublime Text. If you don't already have the package manager installed, then install it by bringing up the console `Ctrl` + `'` (in Linux you may need to use `Ctrl` + `) and pasting in:

    import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())

Press enter and wait for that to install. Once complete, press `Ctrl` + `Shift ` + `P` to bring up the command palette and type `Install`, press enter to select `Package Control: Install package`. 

This should pop up a new menu where you can now type `Emmet` and press enter. Give it a few seconds to install and now you're good to go, you have Emmet -- or Zen Coding -- installed and can write your HTML and CSS more efficiently. 