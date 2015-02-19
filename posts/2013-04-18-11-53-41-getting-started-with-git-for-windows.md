---title: Getting Started with Git for Windowsslug: getting-started-with-git-for-windowsdate: 2013-04-18 11:53tags:  - github - windows - tutorial - git---Following on from my [Installing Git for Windows](http://www.adamkdean.co.uk/blog/read/60/installing-git-for-windows) post, today we're going to learn how to get started with our first repository. This is only going to cover the basics, there is much more to Git but you don't need to know that stuff just yet.

# Creating the repo

The first thing we need to do is go to [GitHub](http://github.com/) and login. Once there, we want to create a new repository, which you can do by clicking the little book and plus icon in the top right hand corner. 

For Repository name let's use `MyFirstGitProject`. Leave the description blank for now, and make sure the repo is public. Finally, check the `Initialize this repository with a README` option and click `Create repository`.

![Creating the repo](http://i.imgur.com/375YdrZ.png)

# Cloning the repo

Excellent. Now we have a repository all set up and ready to go. The next thing we need to do is `clone` it on our local machine. To do this we need to make note of the SSH clone url which we can find on the repo page.

![SSH](http://i.imgur.com/NpDLs6v.png)

If you haven't already installed Git for Windows, read the [Installing Git for Windows](http://www.adamkdean.co.uk/blog/read/60/installing-git-for-windows) post first and then come back to this tutorial. 

If you're ready to proceed, open up Git Bash. I like to keep my repos in a single directory, `C:\GitHub\`, so let's try that for now. Note: Git Bash uses Linux style file paths, so we have to keep that in mind when using it. Change directory to C: using the `cd` command:

    cd /c

And now let's create a directory called GitHub using the `mkdir` command:

    mkdir GitHub

Now let's move into that directory, again using the `cd` command:

    cd GitHub

Excellent. Now let's clone the repository. Remember that SSH clone url from before, now we need to use it. Be sure to use *your* username, not mine:

    git clone git@github.com:YourUsername/MyFirstGitProject.git

When asked if you want to continue connecting, enter `yes`. Enter your passphrase and press enter. Now Git Bash will now create a directory for the repo and download all the latest files for you. If you open up that directory in Windows Explorer, you'll see everything has been created and we're ready to add files.

# Adding files to the repo

Let's make a new file, call it `MyFirstGitProject.cs`. I'm going to use `C#` because it's my language of choice, but you can use whatever language you want. GitHub doesn't discriminate. Into `MyFirstGitProject.cs` put some code:

    public class MyFirstGitProject
    {
		public MyFirstGitProject()
		{
			// todo: some code here
		}
    }

Save the file and go to the Git Bash window. We're now going to add this file to the repository. Even though we created the file within the directory, it isn't actually part of the repo yet. We have to tell Git to track that file, and we do this by `add`ing the file to the repo.

You can add files individually, like so:

    git add MyFirstGitProject.cs

But for when you have more files, or you want to check for changed files, it's easier to just add and update all files at once. For this you can simply type:

    git add -A

Do that now. Make sure you `cd MyFirstGitProject/` first though. Once you've done that, let's check to see if the files been added. We want to check the `status`.

    git status

You should see that a new file has been found: MyFirstGitProject.cs! That's good, we've added the file to the git but we haven't actually committed it yet. The way Git works is that every time you want to check in changes, you add the files you've changed and then you `commit` them, usually with a message. It's easier to learn by doing, so let's commit your latest change.

    git commit -m "Added example code"

Here we tell git to commit all changes to the **local** repository, and we add a message with the `-m` marker. Make sure you use quotes for your message. If everything goes OK, it should tell you it's added 1 file with 7 insertions (lines).

# Pushing the changes to the online repo

So far we've been working locally, as we *cloned* our online repository. But now we want to `push` our changes to GitHub for the world to see. This is actually quite easy, but first you must understand how Git works. 

A Git repository can have multiple branches, each branch can have a different set of code. Think of it like having a `release` branch of code that works fine, and a `development` branch of code that is a bit buggy, because you're working on it. You would make changes to your development branch and then when it's fine, push the changes over to your release, or `master` branch, as it's often called.

We're not going to make any branches, so we're working on the `master` branch, the default one. When we push our changes, we select the place to push the changes to (the remote server) and the branch to push (master in our case). When we cloned our repo, Git set up the remote server for us, it's called `origin`. 

The syntax for pushing looks like this:

    git push [remote] [local]

So let's give it a try, in Git Bash, type this:

    git push origin master

Enter your pass phrase, press enter, and once it's done, go back to your GitHub page and see if the changes are there. They should be. You've just pushed your first code to GitHub. Great stuff.

# Pulling changes from the online repo

But what if you're working on another computer, and you've made changes, and now your code is out of date? Well, to update your repo, you need to `pull` the changes. This is almost identical to the push command:

    git pull [remote] [local]

So let's give it a try, in Git Bash, type this:

    git pull origin master

It should tell you that you're already up to date, but if you're not, that will pull all the changes that you've made into your local repository.

# Recap

	# clone a repo
	git clone git@github.com:YourUsername/MyFirstGitProject.git

	# add all new/changed files
	git add -A

	# commit the changes
	git commit -m "Message here"

	# check the status of git
	git status

	# push the changes to GitHub
	git push origin master

	# pull changes from GitHub
	git pull origin master

The general work flow for a single person is to make the repo, clone it, work on files, add them, commit them. When you're ready, push them to GitHub. If you're only ever working on one computer on a project on your own, you'll rarely have to pull changes.

Note: you can commit multiple times without needing to push the changes to GitHub. People often make a commit for each type of change they make. Added a feature? Commit that. Fixed a big? Commit that. If you find yourself writing a paragraph in the commit message, you're not splitting the commits enough.

If you're confused by any of this, feel free to post a comment or head on over to [StackOverflow](http://www.stackoverflow.com/).