---title: Installing Git for Windowsslug: installing-git-for-windowsdate: 2013-04-12 16:41tags:  - tutorial - windows - github - git---The easiest way to get up and running with Git on windows is to download and install *Git for Windows*. You can find the latest build available for download here: [Git for Windows](http://code.google.com/p/msysgit/downloads/list?q=full+installer+official+git).

For this article, I'm going to use `Git-1.8.1.2-preview20130201.exe`.

Once you've downloaded that, run it, agree with the security questions, and install it with all the default options selected. You should have a shortcut to *Git Bash* on your desktop now.

The easiest way to set Git up is to use the Git GUI. Find that in your start menu and run it.

![Git Gui](http://i.imgur.com/uwAkZLA.png)

Now go to `Help`, and then `Show SSH Key`. You should get this window:

![SSH Key](http://i.imgur.com/QweECTb.png)

Click `Generate Key` and enter a passphrase. Make sure you remember this, you'll use it every time you push/pull changes to/from GitHub. It's important.

Now go to your [GitHub](http://github.com/) account. If you don't have one, make one - you'll need it. Once you're logged in, go to your `Account settings`:

![Account settings](http://i.imgur.com/8a4pGFt.png)

Next, click the `SSH Keys` tab.

![SSH Keys](http://i.imgur.com/zR2wp9Y.png)

Once you've done that, click `Add SSH Key` and paste in the big chunk of text that you generated before in Git GUI. Give it a memorable name, such as *HomePC* or *WorkPC*, and click `Add key`.

You can close `Git GUI` now.

# Setting up Git profile

We're now going to configure our Git profile. Open up `Git Bash` and enter the following, being sure to enter your own details:

    git config --global user.name "Firstname Lastname"
    git config --global user.email "your_email@youremail.com"

That's that done. 

# Clone a repo

Now let's clone a repo to test it. I find it best to have a single directory for all my GitHub repositories. Feel free to put them where you like, but for this we'll be using `C:\GitHub\`.

Git Bash uses Linux style file paths, so we have to keep that in mind when using it. Change directory to C using the `cd` command:

    cd /c

And now let's create a directory called GitHub using the `mkdir` command:

    mkdir GitHub

Now let's move into that directory, again using the `cd` command:

    cd GitHub

Excellent. Now let's clone a repository. I'll provide one of my smaller repos, but feel free to use any you like. In Git Bash, clone the repo like so:

    git clone git://github.com/Imdsm/Slugify.git

Git Bash will now create a directory for the repo and download all the latest files for you. If you open up that directory in Windows Explorer, you'll see everything is working perfectly:

![Success](http://i.imgur.com/H3x0E1w.png)

And there you have it. Git for Windows.

<sub>Further reading:  
[New to Git?](https://github.com/blog/120-new-to-git) at GitHub.com  
[Git (software)](http://en.wikipedia.org/wiki/Git_(software)) at Wikipedia.org  
[Git for beginners: The definitive practical guide](http://stackoverflow.com/questions/315911/git-for-beginners-the-definitive-practical-guide)  at Stackoverflow.com</sub>