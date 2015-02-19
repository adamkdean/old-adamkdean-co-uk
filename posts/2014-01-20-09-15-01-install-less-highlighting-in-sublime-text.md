---title: Install LESS highlighting in Sublime Textslug: install-less-highlighting-in-sublime-textdate: 2014-01-20 09:15tags:  - less - sublimetext---Sublime Text doesn't come with LESS highlighting by default, but it's quite easy to install.

I've pulled the following from my previous blog post on [how to install Zen Coding/Emmet in Sublime Text](http://adamkdean.co.uk/blog/read/85/install-emmet-zen-coding-in-sublime-text).

> The first thing you want to do is open up Sublime Text. If you don't already have the package manager installed, then install it by bringing up the console `Ctrl` + `'` and pasting in:

> `import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())`

> Press enter and wait for that to install. Once complete, press `Ctrl` + `Shift ` + `P` to bring up the command palette and type `Install`, press enter to select `Package Control: Install package`. 

Once the menu appears, type `LESS` and select the first package.

Enjoy.